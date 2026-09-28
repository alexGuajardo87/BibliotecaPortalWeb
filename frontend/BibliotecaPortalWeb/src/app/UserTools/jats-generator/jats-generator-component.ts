import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { COOKIE } from '../../Core/Constants/api.constants';

interface AutorForm {
    surname: string;
    given_names: string;
    display_name: string;
    email: string;
    orcid: string;
    orcid_authenticated: boolean;
    corresponding: boolean;
    affiliation_id: string;
}

interface AfiliacionForm {
    id: string;
    institution: string;
    ror: string;
}

interface SeccionForm {
    id: string;
    title: string;
    paragraphs: string;
}

interface FiguraForm {
    id: string;
    section_id: string;
    position: number;
    label: string;
    title: string;
    note: string;
    filename: string;
}

interface ReferenciaForm {
    id: string;
    type: string;
    authors: string;
    title: string;
    source: string;
    year: string;
    volume: string;
    issue: string;
    first_page: string;
    last_page: string;
    doi: string;
    citation: string;
}

interface CustomMetaForm {
    name: string;
    value: string;
}

interface JatsFormValue {
    journal: {
        id: string;
        id_type: string;
        title: string;
        title_en: string;
        abbrev_es: string;
        abbrev_en: string;
        issn: string;
        publisher: string;
        country: string;
        url: string;
    };
    article: {
        id: string;
        type: string;
        category: string;
        title: string;
        title_en: string;
        doi: string;
        volume: string;
        issue: string;
        first_page: string;
        last_page: string;
        publication_day: string;
        publication_month: string;
        publication_year: string;
        url: string;
    };
    authors: AutorForm[];
    affiliations: AfiliacionForm[];
    publicationHistory: {
        received_day: string;
        received_month: string;
        received_year: string;
        accepted_day: string;
        accepted_month: string;
        accepted_year: string;
    };
    permissions: {
        copyright_statement: string;
        copyright_year: string;
        copyright_holder: string;
        license_url: string;
        license_text: string;
    };
    abstract: {
        es: string;
        en: string;
    };
    keywords: {
        es: string;
        en: string;
    };
    sections: SeccionForm[];
    figures: FiguraForm[];
    references: ReferenciaForm[];
    customMeta: CustomMetaForm[];
}

@Component({
    selector: 'app-jats-generator',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ToastModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        ButtonModule,
        TooltipModule
    ],
    templateUrl: './jats-generator-component.html',
    providers: [MessageService]
})
export class JatsGeneratorComponent {

    private readonly fb = inject(FormBuilder);
    private readonly http = inject(HttpClient);
    private readonly messageService = inject(MessageService);
    private readonly cdr = inject(ChangeDetectorRef);

    articleTypes = [
        {
            label: 'Research Article',
            value: 'research-article'
        },
        {
            label: 'Review Article',
            value: 'review-article'
        },
        {
            label: 'Brief Report',
            value: 'brief-report'
        },
        {
            label: 'Case Report',
            value: 'case-report'
        }
    ];

    referenceTypes = [
        {
            label: 'Journal',
            value: 'journal'
        },
        {
            label: 'Book',
            value: 'book'
        },
        {
            label: 'Chapter',
            value: 'chapter'
        },
        {
            label: 'Web',
            value: 'web'
        }
    ];

    booleanOptions = [
        {
            label: 'Sí',
            value: true
        },
        {
            label: 'No',
            value: false
        }
    ];

    jatsForm = this.fb.group({
        journal: this.fb.group({
            id: [''],
            id_type: [''],
            title: ['', Validators.required],
            title_en: [''],
            abbrev_es: [''],
            abbrev_en: [''],
            issn: [''],
            publisher: [''],
            country: [''],
            url: ['']
        }),

        article: this.fb.group({
            id: [''],
            type: ['research-article'],
            category: [''],
            title: ['', Validators.required],
            title_en: [''],
            doi: [''],
            volume: [''],
            issue: [''],
            first_page: [''],
            last_page: [''],
            publication_day: [''],
            publication_month: [''],
            publication_year: [''],
            url: ['']
        }),

        authors: this.fb.array([]),

        affiliations: this.fb.array([]),

        publicationHistory: this.fb.group({
            received_day: [''],
            received_month: [''],
            received_year: [''],
            accepted_day: [''],
            accepted_month: [''],
            accepted_year: ['']
        }),

        permissions: this.fb.group({
            copyright_statement: [''],
            copyright_year: [''],
            copyright_holder: [''],
            license_url: [''],
            license_text: ['']
        }),

        abstract: this.fb.group({
            es: [''],
            en: ['']
        }),

        keywords: this.fb.group({
            es: [''],
            en: ['']
        }),

        sections: this.fb.array([]),

        figures: this.fb.array([]),

        references: this.fb.array([]),

        customMeta: this.fb.array([])
    });

    constructor() {
        this.autores.push(this.crearAutor(1));
        this.afiliaciones.push(this.crearAfiliacion(1));
        this.secciones.push(this.crearSeccion(1));
        this.figuras.push(this.crearFigura(1));
        this.referencias.push(this.crearReferencia(1));
    }

    get autores(): FormArray {
        return this.jatsForm.get('authors') as FormArray;
    }

    get afiliaciones(): FormArray {
        return this.jatsForm.get('affiliations') as FormArray;
    }

    get secciones(): FormArray {
        return this.jatsForm.get('sections') as FormArray;
    }

    get figuras(): FormArray {
        return this.jatsForm.get('figures') as FormArray;
    }

    get referencias(): FormArray {
        return this.jatsForm.get('references') as FormArray;
    }

    get customMeta(): FormArray {
        return this.jatsForm.get('customMeta') as FormArray;
    }

    get afiliacionesOpciones(): { label: string; value: string }[] {
        return this.afiliaciones.controls.map((control, index) => {
            const value = control.value as AfiliacionForm;

            return {
                label: `${value.id || `aff-${index + 1}`} - ${value.institution || 'Sin institución'}`,
                value: value.id || `aff-${index + 1}`
            };
        });
    }

    get seccionesOpciones(): { label: string; value: string }[] {
        return this.secciones.controls.map((control, index) => {
            const value = control.value as SeccionForm;

            return {
                label: `${value.id || `sec-${index + 1}`} - ${value.title || 'Sin título'}`,
                value: value.id || `sec-${index + 1}`
            };
        });
    }

    private crearAutor(index = 1): FormGroup {
        return this.fb.group({
            surname: ['', Validators.required],
            given_names: ['', Validators.required],
            display_name: [''],
            email: [''],
            orcid: [''],
            orcid_authenticated: [false],
            corresponding: [false],
            affiliation_id: ['']
        });
    }

    private crearAfiliacion(index = 1): FormGroup {
        return this.fb.group({
            id: [`aff-${index}`],
            institution: [''],
            ror: ['']
        });
    }

    private crearSeccion(index = 1): FormGroup {
        return this.fb.group({
            id: [`sec-${index}`],
            title: ['', Validators.required],
            paragraphs: ['']
        });
    }

    private crearFigura(index = 1): FormGroup {
        return this.fb.group({
            id: [`fig-${index}`],
            section_id: [''],
            position: [1],
            label: [`Figura ${index}`],
            title: [''],
            note: [''],
            filename: ['']
        });
    }

    private crearReferencia(index = 1): FormGroup {
        return this.fb.group({
            id: [`ref-${index}`],
            type: ['journal'],
            authors: [''],
            title: [''],
            source: [''],
            year: [''],
            volume: [''],
            issue: [''],
            first_page: [''],
            last_page: [''],
            doi: [''],
            citation: ['']
        });
    }

    private crearCustomMeta(): FormGroup {
        return this.fb.group({
            name: [''],
            value: ['']
        });
    }

    agregarAutor(): void {
        this.autores.push(
            this.crearAutor(this.autores.length + 1)
        );
    }

    eliminarAutor(index: number): void {
        if (this.autores.length > 1) {
            this.autores.removeAt(index);
        }
    }

    agregarAfiliacion(): void {
        this.afiliaciones.push(
            this.crearAfiliacion(this.afiliaciones.length + 1)
        );
    }

    eliminarAfiliacion(index: number): void {
        if (this.afiliaciones.length > 1) {
            const affiliationId = this.afiliaciones
                .at(index)
                .get('id')
                ?.value;

            this.afiliaciones.removeAt(index);

            this.autores.controls.forEach(control => {
                if (
                    control.get('affiliation_id')?.value ===
                    affiliationId
                ) {
                    control
                        .get('affiliation_id')
                        ?.setValue('');
                }
            });

            this.cdr.detectChanges();
        }
    }

    agregarSeccion(): void {
        this.secciones.push(
            this.crearSeccion(this.secciones.length + 1)
        );
    }

    eliminarSeccion(index: number): void {
        if (this.secciones.length <= 1) {
            return;
        }

        const sectionId = this.secciones
            .at(index)
            .get('id')
            ?.value;

        this.secciones.removeAt(index);

        this.figuras.controls.forEach(control => {
            if (
                control.get('section_id')?.value ===
                sectionId
            ) {
                control
                    .get('section_id')
                    ?.setValue('');
            }
        });
    }

    agregarFigura(): void {
        this.figuras.push(
            this.crearFigura(this.figuras.length + 1)
        );
    }

    eliminarFigura(index: number): void {
        if (this.figuras.length > 1) {
            this.figuras.removeAt(index);
        }
    }

    agregarReferencia(): void {
        this.referencias.push(
            this.crearReferencia(
                this.referencias.length + 1
            )
        );
    }

    eliminarReferencia(index: number): void {
        if (this.referencias.length > 1) {
            this.referencias.removeAt(index);
        }
    }

    agregarCustomMeta(): void {
        this.customMeta.push(
            this.crearCustomMeta()
        );
    }

    eliminarCustomMeta(index: number): void {
        this.customMeta.removeAt(index);
    }

    seleccionarFigura(
        event: Event,
        index: number
    ): void {
        const input =
            event.target as HTMLInputElement;

        const file =
            input.files?.[0];

        if (!file) {
            return;
        }

        this.figuras
            .at(index)
            .get('filename')
            ?.setValue(file.name);
    }

    importarXml(event: Event): void {
        const input =
            event.target as HTMLInputElement;

        const file =
            input.files?.[0];

        if (!file) {
            return;
        }

        if (
            !file.name
                .toLowerCase()
                .endsWith('.xml')
        ) {
            this.messageService.add({
                severity: 'error',
                summary: 'Archivo inválido',
                detail: 'Seleccione un archivo XML JATS.'
            });

            input.value = '';

            return;
        }

        const formData = new FormData();

        formData.append(
            'file',
            file
        );

        this.http.post<any>(
            `${COOKIE}/jats/import`,
            formData,
            {
                withCredentials: true
            }
        ).subscribe({
            next: response => {
                const data =
                    response?.data ??
                    response;

                this.cargarDatosImportados(
                    data
                );

                this.messageService.add({
                    severity: 'success',
                    summary: 'XML importado',
                    detail: 'Los datos del XML JATS fueron cargados correctamente.'
                });

                input.value = '';
            },

            error: error => {
                console.error(error);

                const detail =
                    error?.error?.message ||
                    error?.error?.error ||
                    'No fue posible importar el archivo XML JATS.';

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error al importar',
                    detail
                });

                input.value = '';
            }
        });
    }

    private cargarDatosImportados(
        data: any
    ): void {
        const journal =
            data?.journal ?? {};

        const article =
            data?.article ?? {};

        const history =
            data?.publicationHistory ?? {};

        const received =
            history?.received ?? {};

        const accepted =
            history?.accepted ?? {};

        const permissions =
            data?.permissions ?? {};

        const abstract =
            data?.abstract ?? {};

        const keywords =
            data?.keywords ?? {};

        this.jatsForm.patchValue({
            journal: {
                id: this.toFormString(
                    journal.id
                ),
                id_type: this.toFormString(
                    journal.id_type
                ),
                title: this.toFormString(
                    journal.title
                ),
                title_en: this.toFormString(
                    journal.title_en
                ),
                abbrev_es: this.toFormString(
                    journal.abbrev_es
                ),
                abbrev_en: this.toFormString(
                    journal.abbrev_en
                ),
                issn: this.toFormString(
                    journal.issn
                ),
                publisher: this.toFormString(
                    journal.publisher
                ),
                country: this.toFormString(
                    journal.country
                ),
                url: this.toFormString(
                    journal.url
                )
            },

            article: {
                id: this.toFormString(
                    article.id
                ),
                type:
                    this.toFormString(
                        article.type
                    ) ||
                    'research-article',
                category: this.toFormString(
                    article.category
                ),
                title: this.toFormString(
                    article.title
                ),
                title_en: this.toFormString(
                    article.title_en
                ),
                doi: this.toFormString(
                    article.doi
                ),
                volume: this.toFormString(
                    article.volume
                ),
                issue: this.toFormString(
                    article.issue
                ),
                first_page: this.toFormString(
                    article.first_page
                ),
                last_page: this.toFormString(
                    article.last_page
                ),
                publication_day:
                    this.toFormString(
                        article.publication_day
                    ),
                publication_month:
                    this.toFormString(
                        article.publication_month
                    ),
                publication_year:
                    this.toFormString(
                        article.publication_year
                    ),
                url: this.toFormString(
                    article.url
                )
            },

            publicationHistory: {
                received_day:
                    this.toFormString(
                        received.day ??
                        history.received_day
                    ),
                received_month:
                    this.toFormString(
                        received.month ??
                        history.received_month
                    ),
                received_year:
                    this.toFormString(
                        received.year ??
                        history.received_year
                    ),
                accepted_day:
                    this.toFormString(
                        accepted.day ??
                        history.accepted_day
                    ),
                accepted_month:
                    this.toFormString(
                        accepted.month ??
                        history.accepted_month
                    ),
                accepted_year:
                    this.toFormString(
                        accepted.year ??
                        history.accepted_year
                    )
            },

            permissions: {
                copyright_statement:
                    this.toFormString(
                        permissions.copyright_statement
                    ),
                copyright_year:
                    this.toFormString(
                        permissions.copyright_year
                    ),
                copyright_holder:
                    this.toFormString(
                        permissions.copyright_holder
                    ),
                license_url:
                    this.toFormString(
                        permissions.license_url
                    ),
                license_text:
                    this.toFormString(
                        permissions.license_text
                    )
            },

            abstract: {
                es: this.toText(
                    abstract.es
                ),
                en: this.toText(
                    abstract.en
                )
            },

            keywords: {
                es:
                    this.convertirListaImportada(
                        keywords.es
                    ),
                en:
                    this.convertirListaImportada(
                        keywords.en
                    )
            }
        });

        this.cargarAfiliacionesImportadas(
            data?.affiliations
        );

        this.cargarAutoresImportados(
            data?.authors
        );

        this.cargarSeccionesImportadas(
            data?.sections
        );

        this.cargarFigurasImportadas(
            data?.figures
        );

        this.cargarReferenciasImportadas(
            data?.references
        );

        this.cargarCustomMetaImportado(
            data?.customMeta
        );

        this.jatsForm.updateValueAndValidity({
            emitEvent: false
        });

        this.cdr.detectChanges();
    }

    private cargarAutoresImportados(
        authors: any
    ): void {
        this.autores.clear();

        if (
            !Array.isArray(authors) ||
            authors.length === 0
        ) {
            this.autores.push(
                this.crearAutor(1)
            );

            return;
        }

        authors.forEach(
            (author: any, index: number) => {
                const control =
                    this.crearAutor(
                        index + 1
                    );

                const affiliationId =
                    this.toFormString(
                        author?.affiliation_id
                    );

                const affiliationExists =
                    this.afiliacionesOpciones.some(
                        option =>
                            option.value ===
                            affiliationId
                    );

                control.patchValue(
                    {
                        surname:
                            this.toFormString(
                                author?.surname
                            ),

                        given_names:
                            this.toFormString(
                                author?.given_names
                            ),

                        display_name:
                            this.toFormString(
                                author?.display_name
                            ),

                        email:
                            this.toFormString(
                                author?.email
                            ),

                        orcid:
                            this.toFormString(
                                author?.orcid
                            ),

                        orcid_authenticated:
                            this.toBoolean(
                                author?.orcid_authenticated
                            ),

                        corresponding:
                            this.toBoolean(
                                author?.corresponding
                            ),

                        affiliation_id:
                            affiliationExists
                                ? affiliationId
                                : ''
                    },
                    {
                        emitEvent: false
                    }
                );

                this.autores.push(
                    control
                );
            }
        );

        this.autores.updateValueAndValidity({
            emitEvent: false
        });
    }

    private cargarAfiliacionesImportadas(
        affiliations: any
    ): void {
        this.afiliaciones.clear();

        if (
            !Array.isArray(affiliations) ||
            affiliations.length === 0
        ) {
            this.afiliaciones.push(
                this.crearAfiliacion(1)
            );

            return;
        }

        affiliations.forEach(
            (
                affiliation: any,
                index: number
            ) => {
                const control =
                    this.crearAfiliacion(
                        index + 1
                    );

                control.patchValue(
                    {
                        id:
                            this.toFormString(
                                affiliation?.id
                            ) ||
                            `aff-${index + 1}`,

                        institution:
                            this.toFormString(
                                affiliation?.institution
                            ),

                        ror:
                            this.toFormString(
                                affiliation?.ror
                            )
                    },
                    {
                        emitEvent: false
                    }
                );

                this.afiliaciones.push(
                    control
                );
            }
        );

        this.afiliaciones.updateValueAndValidity({
            emitEvent: false
        });
    }

    private cargarSeccionesImportadas(
        sections: any
    ): void {
        this.secciones.clear();

        if (
            !Array.isArray(sections) ||
            sections.length === 0
        ) {
            this.secciones.push(
                this.crearSeccion(1)
            );

            return;
        }

        sections.forEach(
            (
                section: any,
                index: number
            ) => {
                const control =
                    this.crearSeccion(
                        index + 1
                    );

                control.patchValue(
                    {
                        id:
                            this.toFormString(
                                section?.id
                            ) ||
                            `sec-${index + 1}`,

                        title:
                            this.toFormString(
                                section?.title
                            ),

                        paragraphs:
                            this.convertirParrafosImportados(
                                section?.paragraphs
                            )
                    },
                    {
                        emitEvent: false
                    }
                );

                this.secciones.push(
                    control
                );
            }
        );
    }

    private cargarFigurasImportadas(
        figures: any
    ): void {
        this.figuras.clear();

        if (
            !Array.isArray(figures) ||
            figures.length === 0
        ) {
            this.figuras.push(
                this.crearFigura(1)
            );

            return;
        }

        figures.forEach(
            (
                figure: any,
                index: number
            ) => {
                const control =
                    this.crearFigura(
                        index + 1
                    );

                control.patchValue(
                    {
                        id:
                            this.toFormString(
                                figure?.id
                            ) ||
                            `fig-${index + 1}`,

                        section_id:
                            this.toFormString(
                                figure?.section_id
                            ),

                        position:
                            this.toPosition(
                                figure?.position
                            ),

                        label:
                            this.toFormString(
                                figure?.label
                            ) ||
                            `Figura ${index + 1}`,

                        title:
                            this.toFormString(
                                figure?.title
                            ),

                        note:
                            this.toFormString(
                                figure?.note
                            ),

                        filename:
                            this.toFormString(
                                figure?.filename
                            )
                    },
                    {
                        emitEvent: false
                    }
                );

                this.figuras.push(
                    control
                );
            }
        );
    }

    private cargarReferenciasImportadas(
        references: any
    ): void {
        this.referencias.clear();

        if (
            !Array.isArray(references) ||
            references.length === 0
        ) {
            this.referencias.push(
                this.crearReferencia(1)
            );

            return;
        }

        references.forEach(
            (
                reference: any,
                index: number
            ) => {
                const control =
                    this.crearReferencia(
                        index + 1
                    );

                control.patchValue(
                    {
                        id:
                            this.toFormString(
                                reference?.id
                            ) ||
                            `ref-${index + 1}`,

                        type:
                            this.toFormString(
                                reference?.type
                            ) ||
                            'journal',

                        authors:
                            this.convertirAutoresReferencia(
                                reference?.authors
                            ),

                        title:
                            this.toFormString(
                                reference?.title
                            ),

                        source:
                            this.toFormString(
                                reference?.source
                            ),

                        year:
                            this.toFormString(
                                reference?.year
                            ),

                        volume:
                            this.toFormString(
                                reference?.volume
                            ),

                        issue:
                            this.toFormString(
                                reference?.issue
                            ),

                        first_page:
                            this.toFormString(
                                reference?.first_page
                            ),

                        last_page:
                            this.toFormString(
                                reference?.last_page
                            ),

                        doi:
                            this.toFormString(
                                reference?.doi
                            ),

                        citation:
                            this.toFormString(
                                reference?.citation
                            )
                    },
                    {
                        emitEvent: false
                    }
                );

                this.referencias.push(
                    control
                );
            }
        );
    }

    private cargarCustomMetaImportado(
        customMeta: any
    ): void {
        this.customMeta.clear();

        if (
            !Array.isArray(customMeta)
        ) {
            return;
        }

        customMeta.forEach(
            (meta: any) => {
                const control =
                    this.crearCustomMeta();

                control.patchValue(
                    {
                        name:
                            this.toFormString(
                                meta?.name
                            ),

                        value:
                            this.toFormString(
                                meta?.value
                            )
                    },
                    {
                        emitEvent: false
                    }
                );

                this.customMeta.push(
                    control
                );
            }
        );
    }

    generarXml(): void {
        if (this.jatsForm.invalid) {
            this.jatsForm.markAllAsTouched();

            this.messageService.add({
                severity: 'warn',
                summary: 'Formulario incompleto',
                detail: 'Complete los campos obligatorios antes de generar el XML.'
            });

            return;
        }

        const formValue =
            this.jatsForm.getRawValue() as JatsFormValue;

        const payload = {
            journal: {
                ...formValue.journal
            },

            article: {
                ...formValue.article,

                publication_day:
                    this.toNumber(
                        formValue.article.publication_day
                    ),

                publication_month:
                    this.toNumber(
                        formValue.article.publication_month
                    ),

                publication_year:
                    this.toNumber(
                        formValue.article.publication_year
                    )
            },

            authors:
                formValue.authors.map(
                    (author: AutorForm) => ({
                        surname:
                            author.surname,

                        given_names:
                            author.given_names,

                        display_name:
                            author.display_name,

                        email:
                            author.email,

                        orcid:
                            author.orcid,

                        orcid_authenticated:
                            Boolean(
                                author.orcid_authenticated
                            ),

                        corresponding:
                            Boolean(
                                author.corresponding
                            ),

                        affiliation_id:
                            author.affiliation_id
                    })
                ),

            affiliations:
                formValue.affiliations.map(
                    (
                        affiliation: AfiliacionForm
                    ) => ({
                        id:
                            affiliation.id,

                        institution:
                            affiliation.institution,

                        ror:
                            affiliation.ror
                    })
                ),

            publicationHistory: {
                received: {
                    day:
                        formValue
                            .publicationHistory
                            .received_day,

                    month:
                        formValue
                            .publicationHistory
                            .received_month,

                    year:
                        formValue
                            .publicationHistory
                            .received_year
                },

                accepted: {
                    day:
                        formValue
                            .publicationHistory
                            .accepted_day,

                    month:
                        formValue
                            .publicationHistory
                            .accepted_month,

                    year:
                        formValue
                            .publicationHistory
                            .accepted_year
                }
            },

            permissions: {
                ...formValue.permissions
            },

            abstract: {
                es:
                    formValue.abstract.es,

                en:
                    formValue.abstract.en
            },

            keywords: {
                es:
                    this.convertirLista(
                        formValue.keywords.es
                    ),

                en:
                    this.convertirLista(
                        formValue.keywords.en
                    )
            },

            sections:
                formValue.sections.map(
                    (
                        section: SeccionForm
                    ) => ({
                        id:
                            section.id,

                        title:
                            section.title,

                        paragraphs:
                            this.convertirParrafos(
                                section.paragraphs
                            )
                    })
                ),

            figures:
                formValue.figures.map(
                    (
                        figure: FiguraForm
                    ) => ({
                        id:
                            figure.id,

                        section_id:
                            figure.section_id,

                        position:
                            Number(
                                figure.position
                            ) || 1,

                        label:
                            figure.label,

                        title:
                            figure.title,

                        note:
                            figure.note,

                        filename:
                            figure.filename
                    })
                ),

            references:
                formValue.references.map(
                    (
                        reference: ReferenciaForm
                    ) => ({
                        id:
                            reference.id,

                        type:
                            reference.type,

                        authors:
                            this.convertirAutoresReferencia(
                                reference.authors
                            ),

                        title:
                            reference.title,

                        source:
                            reference.source,

                        year:
                            reference.year,

                        volume:
                            reference.volume,

                        issue:
                            reference.issue,

                        first_page:
                            reference.first_page,

                        last_page:
                            reference.last_page,

                        doi:
                            reference.doi,

                        citation:
                            reference.citation
                    })
                ),

            customMeta:
                formValue.customMeta.map(
                    (
                        meta: CustomMetaForm
                    ) => ({
                        name:
                            meta.name,

                        value:
                            meta.value
                    })
                )
        };

        this.http.post(
            `${COOKIE}/jats/generate`,
            payload,
            {
                withCredentials: true,
                responseType: 'text'
            }
        ).subscribe({
            next: xml => {
                const blob =
                    new Blob(
                        [xml],
                        {
                            type:
                                'application/xml;charset=utf-8'
                        }
                    );

                const url =
                    window.URL.createObjectURL(
                        blob
                    );

                const anchor =
                    document.createElement(
                        'a'
                    );

                anchor.href = url;

                anchor.download =
                    `${formValue.article.id || 'article'}.xml`;

                anchor.click();

                window.URL.revokeObjectURL(
                    url
                );

                this.messageService.add({
                    severity: 'success',
                    summary: 'XML generado',
                    detail: 'El archivo XML JATS fue generado correctamente.'
                });
            },

            error: error => {
                console.error(error);

                const detail =
                    error?.error?.message ||
                    error?.error?.error ||
                    'No fue posible generar el XML JATS.';

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail
                });
            }
        });
    }

    limpiarFormulario(): void {
        this.jatsForm.patchValue({
            journal: {
                id: '',
                id_type: '',
                title: '',
                title_en: '',
                abbrev_es: '',
                abbrev_en: '',
                issn: '',
                publisher: '',
                country: '',
                url: ''
            },

            article: {
                id: '',
                type: 'research-article',
                category: '',
                title: '',
                title_en: '',
                doi: '',
                volume: '',
                issue: '',
                first_page: '',
                last_page: '',
                publication_day: '',
                publication_month: '',
                publication_year: '',
                url: ''
            },

            publicationHistory: {
                received_day: '',
                received_month: '',
                received_year: '',
                accepted_day: '',
                accepted_month: '',
                accepted_year: ''
            },

            permissions: {
                copyright_statement: '',
                copyright_year: '',
                copyright_holder: '',
                license_url: '',
                license_text: ''
            },

            abstract: {
                es: '',
                en: ''
            },

            keywords: {
                es: '',
                en: ''
            }
        });

        this.autores.clear();
        this.afiliaciones.clear();
        this.secciones.clear();
        this.figuras.clear();
        this.referencias.clear();
        this.customMeta.clear();

        this.autores.push(
            this.crearAutor(1)
        );

        this.afiliaciones.push(
            this.crearAfiliacion(1)
        );

        this.secciones.push(
            this.crearSeccion(1)
        );

        this.figuras.push(
            this.crearFigura(1)
        );

        this.referencias.push(
            this.crearReferencia(1)
        );

        this.cdr.detectChanges();
    }

    private convertirLista(
        value: string
    ): string[] {
        if (!value) {
            return [];
        }

        return value
            .split(',')
            .map(
                item => item.trim()
            )
            .filter(
                item => item.length > 0
            );
    }

    private convertirListaImportada(
        value: unknown
    ): string {
        if (Array.isArray(value)) {
            return value
                .map(
                    item => String(item).trim()
                )
                .filter(
                    item => item.length > 0
                )
                .join(', ');
        }

        return value == null
            ? ''
            : String(value);
    }

    private convertirParrafos(
        value: string
    ): string[] {
        if (!value) {
            return [];
        }

        return value
            .split(/\n\s*\n/)
            .map(
                item => item.trim()
            )
            .filter(
                item => item.length > 0
            );
    }

    private convertirParrafosImportados(
        value: unknown
    ): string {
        if (Array.isArray(value)) {
            return value
                .map(
                    item => String(item).trim()
                )
                .filter(
                    item => item.length > 0
                )
                .join('\n\n');
        }

        return value == null
            ? ''
            : String(value);
    }

    private convertirAutoresReferencia(
        value: unknown
    ): string {
        if (!Array.isArray(value)) {
            return value == null
                ? ''
                : String(value);
        }

        return value
            .map(
                (author: any) => {
                    if (
                        typeof author ===
                        'string'
                    ) {
                        return author;
                    }

                    const surname =
                        String(
                            author?.surname ??
                            ''
                        ).trim();

                    const givenNames =
                        String(
                            author?.given_names ??
                            ''
                        ).trim();

                    if (
                        surname &&
                        givenNames
                    ) {
                        return `${surname}, ${givenNames}`;
                    }

                    return (
                        surname ||
                        givenNames
                    );
                }
            )
            .filter(
                item =>
                    item.length > 0
            )
            .join('; ');
    }

    private toBoolean(
        value: unknown
    ): boolean {
        return (
            value === true ||
            value === 1 ||
            value === '1' ||
            value === 'true' ||
            value === 'yes'
        );
    }

    private toFormString(
        value: unknown
    ): string {
        if (
            value === null ||
            value === undefined
        ) {
            return '';
        }

        return String(value);
    }

    private toPosition(
        value: unknown
    ): number {
        const numberValue =
            Number(value);

        if (
            Number.isNaN(numberValue) ||
            numberValue < 1
        ) {
            return 1;
        }

        return numberValue;
    }

    private toNumber(
        value: string
    ): number | null {
        if (
            value === null ||
            value === undefined ||
            value === ''
        ) {
            return null;
        }

        const numberValue =
            Number(value);

        return Number.isNaN(numberValue)
            ? null
            : numberValue;
    }

    private toText(
        value: unknown
    ): string {
        if (Array.isArray(value)) {
            return value.join('\n');
        }

        return value == null
            ? ''
            : String(value);
    }
}

