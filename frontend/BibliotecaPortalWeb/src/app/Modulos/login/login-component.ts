import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        RouterModule,
        ReactiveFormsModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        ToastModule
    ],
    providers: [
        MessageService
    ],
    templateUrl: './login-component.html',
    styleUrl: './login-component.css'
})
export class LoginComponent {

    private readonly fb = inject(FormBuilder);
    private readonly messageService = inject(MessageService);

    dialogRecuperacion = false;

    cargando = signal(false);
    enviandoRecuperacion = signal(false);
    recuperacionEnviada = signal(false);

    loginForm: FormGroup;
    recuperacionForm: FormGroup;

    constructor() {
        this.loginForm = this.fb.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            password: [
                '',
                [
                    Validators.required
                ]
            ]
        });

        this.recuperacionForm = this.fb.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.email
                ]
            ]
        });
    }

    iniciarSesion(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.cargando.set(true);

        const datos = this.loginForm.getRawValue();

        console.log(datos);

        setTimeout(() => {
            this.cargando.set(false);

            this.messageService.add({
                severity: 'info',
                summary: 'Inicio de sesión',
                detail: 'Aquí debes conectar tu servicio de autenticación.'
            });
        }, 800);
    }

    mostrarRecuperacion(): void {
        const correo = this.loginForm.get('email')?.value;

        this.recuperacionForm.patchValue({
            email: correo || ''
        });

        this.recuperacionEnviada.set(false);
        this.dialogRecuperacion = true;
    }

    cerrarRecuperacion(): void {
        if (this.enviandoRecuperacion()) {
            return;
        }

        this.dialogRecuperacion = false;
        this.recuperacionEnviada.set(false);
        this.recuperacionForm.reset();
    }

    recuperarPassword(): void {
        if (this.recuperacionForm.invalid) {
            this.recuperacionForm.markAllAsTouched();
            return;
        }

        this.enviandoRecuperacion.set(true);

        const correo = this.recuperacionForm.get('email')?.value;

        console.log(correo);

        setTimeout(() => {
            this.enviandoRecuperacion.set(false);
            this.recuperacionEnviada.set(true);

            this.messageService.add({
                severity: 'success',
                summary: 'Solicitud enviada',
                detail: 'Revisa tu correo electrónico.'
            });
        }, 1200);
    }
}

