import { Component, inject } from '@angular/core';
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
        publication_day: string | number;
        publication_month: string | number;
        publication_year: string | number;
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
    providers: [MessageService],
    templateUrl: './jats-generator-component.html'
})
export class JatsGeneratorComponent {

    private fb = inject(FormBuilder);
    private http = inject(HttpClient);
    private messageService = inject(MessageService);

    articleTypes = [
        {
            label: 'Artículo de investigación',
            value: 'research-article'
        },
        {
            label: 'Artículo de revisión',
            value: 'review-article'
        },
        {
            label: 'Comunicación breve',
            value: 'brief-report'
        },
        {
            label: 'Reporte de caso',
            value: 'case-report'
        }
    ];

    referenceTypes = [
        {
            label: 'Artículo de revista',
            value: 'journal'
        },
        {
            label: 'Libro',
            value: 'book'
        },
        {
            label: 'Capítulo de libro',
            value: 'chapter'
        },
        {
            label: 'Sitio web',
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
            id: ['SIBIUAS', Validators.required],
            id_type: ['ojs'],
            title: ['', Validators.required],
            title_en: [''],
            abbrev_es: [''],
            abbrev_en: [''],
            issn: ['', Validators.required],
            publisher: ['', Validators.required],
            country: ['MX'],
            url: ['']
        }),

        article: this.fb.group({
            id: ['', Validators.required],
            type: ['research-article', Validators.required],
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
            publication_year: [new Date().getFullYear()],
            url: ['']
        }),

        authors: this.fb.array([
            this.crearAutor()
        ]),

        affiliations: this.fb.array([
            this.crearAfiliacion()
        ]),

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

        sections: this.fb.array([
            this.crearSeccion(1)
        ]),

        figures: this.fb.array([]),

        references: this.fb.array([]),

        customMeta: this.fb.array([])
    });

    get autores(): FormArray {
        return this.jatsForm.get('authors') as FormArray;
    }

    get afiliacionesForm(): FormArray {
        return this.jatsForm.get('affiliations') as FormArray;
    }

    get afiliaciones(): { label: string; value: string }[] {
        return this.afiliacionesForm.controls.map((control, index) => {
            const value = control.value as AfiliacionForm;

            return {
                label: `${value.id || `aff-${index + 1}`} - ${value.institution || 'Sin institución'}`,
                value: value.id || `aff-${index + 1}`
            };
        });
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

    private crearAutor(): FormGroup {
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
            label: [`Figura ${index}`],
            title: [''],
            note: [''],
            filename: ['']
        });
    }

    private crearReferencia(index = 1): FormGroup {
        return this.fb.group({
            id: [`ref-${index}`],
            type: ['journal', Validators.required],
            authors: [''],
            title: ['', Validators.required],
            source: [''],
            year: [''],
            volume: [''],
            issue: [''],
            first_page: [''],
            last_page: [''],
            doi: ['']
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
            this.crearAutor()
        );
    }

    eliminarAutor(index: number): void {
        if (this.autores.length > 1) {
            this.autores.removeAt(index);
        }
    }

    agregarAfiliacion(): void {
        const index = this.afiliacionesForm.length + 1;

        this.afiliacionesForm.push(
            this.crearAfiliacion(index)
        );
    }

    eliminarAfiliacion(index: number): void {
        this.afiliacionesForm.removeAt(index);
    }

    agregarSeccion(): void {
        const index = this.secciones.length + 1;

        this.secciones.push(
            this.crearSeccion(index)
        );
    }

    eliminarSeccion(index: number): void {
        if (this.secciones.length > 1) {
            this.secciones.removeAt(index);
        }
    }

    agregarFigura(): void {
        const index = this.figuras.length + 1;

        this.figuras.push(
            this.crearFigura(index)
        );
    }

    eliminarFigura(index: number): void {
        this.figuras.removeAt(index);
    }

    seleccionarFigura(
        event: Event,
        index: number
    ): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) {
            return;
        }

        this.figuras
            .at(index)
            .get('filename')
            ?.setValue(file.name);
    }

    agregarReferencia(): void {
        const index = this.referencias.length + 1;

        this.referencias.push(
            this.crearReferencia(index)
        );
    }

    eliminarReferencia(index: number): void {
        this.referencias.removeAt(index);
    }

    agregarCustomMeta(): void {
        this.customMeta.push(
            this.crearCustomMeta()
        );
    }

    eliminarCustomMeta(index: number): void {
        this.customMeta.removeAt(index);
    }

    generarXml(): void {
        if (this.jatsForm.invalid) {
            this.jatsForm.markAllAsTouched();

            this.messageService.add({
                severity: 'warn',
                summary: 'Formulario incompleto',
                detail: 'Complete los campos obligatorios.'
            });

            return;
        }

        const formValue =
            this.jatsForm.getRawValue() as unknown as JatsFormValue;

        const data = {
            journal: {
                id: formValue.journal.id,
                id_type: formValue.journal.id_type,
                title: formValue.journal.title,
                title_en: formValue.journal.title_en,
                abbrev_es: formValue.journal.abbrev_es,
                abbrev_en: formValue.journal.abbrev_en,
                issn: formValue.journal.issn,
                publisher: formValue.journal.publisher,
                country: formValue.journal.country,
                url: formValue.journal.url
            },

            article: {
                id: formValue.article.id,
                type: formValue.article.type,
                category: formValue.article.category,
                title: formValue.article.title,
                title_en: formValue.article.title_en,
                doi: formValue.article.doi,
                volume: formValue.article.volume,
                issue: formValue.article.issue,
                first_page: formValue.article.first_page,
                last_page: formValue.article.last_page,
                publication_day: formValue.article.publication_day,
                publication_month: formValue.article.publication_month,
                publication_year: formValue.article.publication_year,
                url: formValue.article.url
            },

            authors: formValue.authors.map(
                (author: AutorForm) => ({
                    surname: author.surname,
                    given_names: author.given_names,
                    display_name: author.display_name,
                    email: author.email,
                    orcid: author.orcid,
                    orcid_authenticated: author.orcid_authenticated,
                    corresponding: author.corresponding,
                    affiliation_id: author.affiliation_id
                })
            ),

            affiliations: formValue.affiliations.map(
                (affiliation: AfiliacionForm) => ({
                    id: affiliation.id,
                    institution: affiliation.institution,
                    ror: affiliation.ror
                })
            ),

            publicationHistory: {
                received: {
                    day: formValue.publicationHistory.received_day,
                    month: formValue.publicationHistory.received_month,
                    year: formValue.publicationHistory.received_year
                },
                accepted: {
                    day: formValue.publicationHistory.accepted_day,
                    month: formValue.publicationHistory.accepted_month,
                    year: formValue.publicationHistory.accepted_year
                }
            },

            permissions: {
                copyright_statement:
                    formValue.permissions.copyright_statement,
                copyright_year:
                    formValue.permissions.copyright_year,
                copyright_holder:
                    formValue.permissions.copyright_holder,
                license_url:
                    formValue.permissions.license_url,
                license_text:
                    formValue.permissions.license_text
            },

            abstract: {
                es: formValue.abstract.es,
                en: formValue.abstract.en
            },

            keywords: {
                es: this.convertirLista(
                    formValue.keywords.es
                ),
                en: this.convertirLista(
                    formValue.keywords.en
                )
            },

            sections: formValue.sections.map(
                (section: SeccionForm) => ({
                    id: section.id,
                    title: section.title,
                    paragraphs: this.convertirParrafos(
                        section.paragraphs
                    )
                })
            ),

            figures: formValue.figures.map(
                (figure: FiguraForm) => ({
                    id: figure.id,
                    label: figure.label,
                    title: figure.title,
                    note: figure.note,
                    filename: figure.filename
                })
            ),

            references: formValue.references.map(
                (reference: ReferenciaForm) => ({
                    id: reference.id,
                    type: reference.type,
                    authors: this.convertirAutoresReferencia(
                        reference.authors
                    ),
                    title: reference.title,
                    source: reference.source,
                    year: reference.year,
                    volume: reference.volume,
                    issue: reference.issue,
                    first_page: reference.first_page,
                    last_page: reference.last_page,
                    doi: reference.doi
                })
            ),

            customMeta: formValue.customMeta.map(
                (meta: CustomMetaForm) => ({
                    name: meta.name,
                    value: meta.value
                })
            )
        };

        this.http.post(
            `${COOKIE}/jats/generate`,
            data,
            {
                withCredentials: true,
                responseType: 'text'
            }
        ).subscribe({
            next: (xml: string) => {
                console.log(
                    'XML generado:',
                    xml
                );

                const blob = new Blob(
                    [xml],
                    {
                        type: 'application/xml;charset=utf-8'
                    }
                );

                const url =
                    window.URL.createObjectURL(blob);

                const link =
                    document.createElement('a');

                link.href = url;
                link.download =
                    `${formValue.article.id || 'article'}.xml`;

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                window.URL.revokeObjectURL(url);

                this.messageService.add({
                    severity: 'success',
                    summary: 'XML generado',
                    detail: 'El archivo JATS fue generado correctamente.'
                });
            },

            error: (error) => {
                console.error(
                    'Error al generar XML:',
                    error
                );

                let detail =
                    'No fue posible generar el XML JATS.';

                if (typeof error?.error === 'string') {
                    detail = error.error;
                } else if (error?.error?.message) {
                    detail = error.error.message;
                }

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail
                });
            }
        });
    }

    private convertirLista(
        value: string | null | undefined
    ): string[] {
        if (!value) {
            return [];
        }

        return value
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);
    }

    private convertirParrafos(
        value: string | null | undefined
    ): string[] {
        if (!value) {
            return [];
        }

        return value
            .split(/\n\s*\n/)
            .map(item => item.trim())
            .filter(item => item.length > 0);
    }

    private convertirAutoresReferencia(
        value: string | null | undefined
    ): {
        surname: string;
        given_names: string;
    }[] {
        if (!value) {
            return [];
        }

        return value
            .split(';')
            .map(author => author.trim())
            .filter(author => author.length > 0)
            .map(author => {
                const parts = author
                    .split(',')
                    .map(part => part.trim());

                return {
                    surname: parts[0] ?? '',
                    given_names: parts[1] ?? ''
                };
            });
    }

    limpiarFormulario(): void {
        this.jatsForm.reset({
            journal: {
                id: 'SIBIUAS',
                id_type: 'ojs',
                title: '',
                title_en: '',
                abbrev_es: '',
                abbrev_en: '',
                issn: '',
                publisher: '',
                country: 'MX',
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
                publication_year: new Date().getFullYear(),
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

        while (this.autores.length > 0) {
            this.autores.removeAt(0);
        }

        while (this.afiliacionesForm.length > 0) {
            this.afiliacionesForm.removeAt(0);
        }

        while (this.secciones.length > 0) {
            this.secciones.removeAt(0);
        }

        while (this.figuras.length > 0) {
            this.figuras.removeAt(0);
        }

        while (this.referencias.length > 0) {
            this.referencias.removeAt(0);
        }

        while (this.customMeta.length > 0) {
            this.customMeta.removeAt(0);
        }

        this.autores.push(
            this.crearAutor()
        );

        this.afiliacionesForm.push(
            this.crearAfiliacion(1)
        );

        this.secciones.push(
            this.crearSeccion(1)
        );

        this.messageService.add({
            severity: 'info',
            summary: 'Formulario limpiado',
            detail: 'Los datos fueron eliminados.'
        });
    }
}