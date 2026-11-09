
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-validar-constancia',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './validar-constancia-component.html'
})
export class ValidarConstanciaComponent implements OnInit {

    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);

    cargando = signal(true);
    constanciaValida = signal(false);
    errorValidacion = signal(false);
    mensajeError = signal('');
    correoContacto = signal('conlainuas@gmail.com');
    constancia = signal<any>(null);
    mensajeValidacion = signal('Constancia válida');

    ngOnInit(): void {
        const id = this.route.snapshot.queryParamMap.get('id');

        if (!id) {
            this.cargando.set(false);
            this.errorValidacion.set(true);
            this.mensajeError.set('No se proporcionó un identificador de constancia.');
            return;
        }

        this.validarConstancia(id);
    }

    validarConstancia(id: string): void {
        this.cargando.set(true);
        this.errorValidacion.set(false);
        this.constanciaValida.set(false);
        this.mensajeError.set('');
        this.constancia.set(null);

        this.http.get<any>(
            'http://localhost:7778/constancias/congreso/verificar-constancia',
            {
                params: { id },
                withCredentials: true
            }
        ).pipe(
            finalize(() => this.cargando.set(false))
        ).subscribe({
            next: (respuesta) => {
                if (respuesta.error || !respuesta.data) {
                    this.errorValidacion.set(true);
                    this.mensajeError.set(
                        respuesta.mensaje || 'No fue posible validar la constancia.'
                    );
                    return;
                }

                this.constanciaValida.set(true);
                this.constancia.set(respuesta.data);
                this.mensajeValidacion.set(respuesta.mensaje || 'Constancia válida');
            },
            error: (error: HttpErrorResponse) => {
                this.errorValidacion.set(true);

                this.constanciaValida.set(false);
                this.constancia.set(null);

                this.mensajeError.set(
                    error.error?.mensaje ||
                    'No fue posible validar la constancia. Verifique el identificador o comuníquese con nosotros.'
                );
            }
        });
    }
}
