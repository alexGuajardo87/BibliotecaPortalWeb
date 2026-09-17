import { Component, inject } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-registro-usuarios',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        ToastModule,
        InputTextModule,
        CheckboxModule,
        ButtonModule,
        SelectModule,
        TextareaModule
    ],
    providers: [
        MessageService
    ],
    templateUrl: './registro-usuarios-component.html',
    styleUrl: './registro-usuarios-component.css'
})
export class RegistroUsuariosComponent {

    private readonly fb = inject(FormBuilder);
    private readonly messageService = inject(MessageService);

    registroForm: FormGroup;

    niveles = [
        {
            id: 1,
            name: 'Licenciatura'
        },
        {
            id: 2,
            name: 'Maestría'
        },
        {
            id: 3,
            name: 'Doctorado'
        }
    ];

    unidadesAcademicas: any[] = [];

    unidadesOrganizacionales: any[] = [];

    constructor() {

        this.registroForm = this.fb.group(
            {
                nombre: [
                    '',
                    [
                        Validators.required
                    ]
                ],

                primerApellido: [
                    '',
                    [
                        Validators.required
                    ]
                ],

                segundoApellido: [
                    ''
                ],

                telefono: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(/^[0-9]{10}$/)
                    ]
                ],

                correo: [
                    '',
                    [
                        Validators.required,
                        Validators.email
                    ]
                ],

                confirmarCorreo: [
                    '',
                    [
                        Validators.required,
                        Validators.email
                    ]
                ],

                tipoUsuario: [
                    [],
                    [
                        this.alMenosUnTipoUsuario
                    ]
                ],

                numeroCuenta: [
                    ''
                ],

                nivel: [
                    null
                ],

                unidadAcademica: [
                    null
                ],

                numeroEmpleado: [
                    ''
                ],

                nivelDocente: [
                    null
                ],

                unidadAcademicaDocente: [
                    null
                ],

                numeroEmpleadoAdministrativo: [
                    ''
                ],

                unidadOrganizacional: [
                    null
                ],

                numeroEmpleadoResponsableUas: [
                    ''
                ],

                nivelResponsableUas: [
                    null
                ],

                unidadAcademicaResponsableUas: [
                    null
                ],

                nombreEscuelaInstitucion: [
                    ''
                ],

                telefonoContactoExterna: [
                    '',
                    [
                        Validators.pattern(/^[0-9]{10}$/)
                    ]
                ],

                direccionEscuelaExterna: [
                    ''
                ]
            },
            {
                validators: this.validarCorreos
            }
        );
    }

    alMenosUnTipoUsuario(
        control: AbstractControl
    ): ValidationErrors | null {

        const valores = control.value;

        if (
            !Array.isArray(valores) ||
            valores.length === 0
        ) {
            return {
                tipoUsuarioRequerido: true
            };
        }

        return null;
    }

    validarCorreos(
        form: AbstractControl
    ): ValidationErrors | null {

        const correo = form.get('correo')?.value;
        const confirmarCorreo = form.get('confirmarCorreo')?.value;

        if (
            correo &&
            confirmarCorreo &&
            correo !== confirmarCorreo
        ) {
            return {
                correosNoCoinciden: true
            };
        }

        return null;
    }

    registrarUsuario(): void {

        if (this.registroForm.invalid) {

            this.registroForm.markAllAsTouched();

            this.messageService.add({
                severity: 'warn',
                summary: 'Formulario incompleto',
                detail: 'Completa correctamente la información requerida.'
            });

            return;
        }

        const datos = this.registroForm.getRawValue();

        console.log('Datos del registro:', datos);

        this.messageService.add({
            severity: 'success',
            summary: 'Registro',
            detail: 'La información del usuario es válida.'
        });
    }
}