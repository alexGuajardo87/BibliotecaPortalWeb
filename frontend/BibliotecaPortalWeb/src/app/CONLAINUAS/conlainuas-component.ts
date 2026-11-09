import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { switchMap } from 'rxjs';
import { CronogramaService, CronogramaRegistro } from '../Services/cronograma.service';
import { AuthSessionService } from '../Services/auth-session.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';



interface ActividadCongreso {
    id: number;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    categoria: string;
    titulo: string;
    participante: string;
    lugar: string;
    descripcion: string;
}

@Component({
    selector: 'app-conlainuas-component',
    imports: [CommonModule, DatePipe],
    templateUrl: './conlainuas-component.html',
    styleUrl: './conlainuas-component.css'
})
export class ConlainuasComponent implements OnInit {
    private readonly cronogramaService = inject(CronogramaService);
    private readonly authSession = inject(AuthSessionService);
    private http = inject(HttpClient);

    readonly fechaInicio = '2026-10-26';
    readonly fechaFin = '2026-10-30';

    readonly categorias = [
        'Todas',
        'Ponencias',
        'Presentaciones de revista',
        'Presentaciones de libro'
    ];

    readonly dias = [
        { fecha: 'general', nombre: 'Programa general', numero: 0 },
        { fecha: '2026-10-26', nombre: 'Lunes', numero: 26 },
        { fecha: '2026-10-27', nombre: 'Martes', numero: 27 },
        { fecha: '2026-10-28', nombre: 'Miércoles', numero: 28 },
        { fecha: '2026-10-29', nombre: 'Jueves', numero: 29 },
        { fecha: '2026-10-30', nombre: 'Viernes', numero: 30 }
    ];

    readonly diaSeleccionado = signal('2026-10-26');
    readonly categoriaSeleccionada = signal('Todas');
    readonly actividades = signal<ActividadCongreso[]>([]);
    readonly cargando = signal(false);
    readonly errorCarga = signal('');

    readonly actividadesFiltradas = computed(() => {
        const fecha = this.diaSeleccionado();
        const categoria = this.categoriaSeleccionada();

        return this.actividades().filter(actividad =>
            (fecha === 'general' || actividad.fecha === fecha) &&
            (categoria === 'Todas' || actividad.categoria === categoria)
        );
    });

    readonly totalActividadesDia = computed(() => {
        const fecha = this.diaSeleccionado();

        return this.actividades().filter(
            actividad => fecha === 'general' || actividad.fecha === fecha
        ).length;
    });

    correoBusqueda = signal('');
    readonly visorAbierto = signal(false);
    readonly constanciaUrl = signal<string | null>(null);
    readonly cargandoConstancia = signal(false);
    readonly errorCargaConstancia = signal(false);

    constancias = signal<any[]>([]);
    indiceConstancia = signal(0);

    mensajeError = signal('');
    correoContacto = signal('conlainuas@gmail.com');
    statusError = signal<number | null>(null);


    constanciaActual = computed(() =>
        this.constancias()[this.indiceConstancia()] ?? null
    );

    ngOnInit(): void {
        this.cargarCronograma();
    }

    cargarCronograma(): void {
        this.cargando.set(true);
        this.errorCarga.set('');

        this.authSession.inicializarSesion().pipe(
            switchMap(() => this.cronogramaService.obtenerCronograma())
        ).subscribe({
            next: respuesta => {
                const actividades = (respuesta.data ?? [])
                    .map(registro => this.convertirActividad(registro))
                    .filter((actividad): actividad is ActividadCongreso => actividad !== null)
                    .sort((a, b) =>
                        a.fecha.localeCompare(b.fecha) ||
                        a.horaInicio.localeCompare(b.horaInicio)
                    );

                this.actividades.set(actividades);
                this.cargando.set(false);
            },
            error: error => {
                console.error('Error al consultar el cronograma:', error);
                this.errorCarga.set(
                    'No fue posible cargar el programa del congreso. Intenta nuevamente.'
                );
                this.cargando.set(false);
            }
        });
    }

    private convertirActividad(registro: CronogramaRegistro): ActividadCongreso | null {
        const fecha = this.normalizarFecha(registro.Dia);
        const horaInicio = (registro.Hora ?? '').substring(0, 5);
        const tipo = (registro.Tipo ?? '').trim().toLowerCase();

        if (!fecha || !horaInicio) {
            return null;
        }

        let categoria: string;
        let titulo = '';
        let participante = '';
        const participantes: string[] = [];
        const detalles: string[] = [];

        if (tipo === 'revista') {
            categoria = 'Presentaciones de revista';
            titulo = registro.NombreRevista || 'Presentación de revista';
            participante = registro.Presentador || registro.EditorJefe || '';
            this.agregarUnico(participantes, registro.Presentador);
            this.agregarUnico(participantes, registro.EditorJefe);
        } else if (tipo === 'libro') {
            categoria = 'Presentaciones de libro';
            titulo = registro.TituloLibro || 'Presentación de libro';
            participante = registro.PresentadorLibro || registro.AutorLibro || '';

            this.agregarUnico(participantes, registro.AutorLibro);
            this.agregarUnico(participantes, registro.CoautorLibro1);
            this.agregarUnico(participantes, registro.CoautorLibro2);
            this.agregarUnico(participantes, registro.PresentadorLibro);
        } else if (tipo === 'ponencia' || tipo === 'preponencia') {
            categoria = 'Ponencias';
            titulo = registro.TituloPonencia || 'Ponencia';
            participante = registro.PresentadorPonenecia || '';

            this.agregarUnico(participantes, registro.PresentadorPonenecia);
            this.agregarUnico(participantes, registro.CoautorPon1);
            this.agregarUnico(participantes, registro.CoautorPon2);
            this.agregarUnico(participantes, registro.CoautorPon3);
            this.agregarUnico(participantes, registro.CoautorPon4);

            if (registro.Eje) {
                detalles.push(registro.Eje);
            }

            if (registro.Mesa) {
                detalles.push(registro.Mesa);
            }
        } else {
            categoria = 'Comité Organizador';
            titulo = registro.TituloOrganizacion || 'Actividad del comité organizador';
            participante = titulo.trim().toLowerCase() === 'conferencia magistral'
                ? 'Claudio Lomnitz'
                : registro.Tipo || 'Comité organizador';
        }

        if (registro.Afiliacion) {
            detalles.push(registro.Afiliacion);
        }

        if (registro.Pais) {
            detalles.push(registro.Pais);
        }

        if (participantes.length > 0) {
            participante = participantes.join(', ');
        }

        return {
            id: registro.Id,
            fecha,
            horaInicio,
            horaFin: '',
            categoria,
            titulo,
            participante: participante || 'Por confirmar',
            lugar: 'Virtual',
            descripcion: detalles.join(' · ')
        };
    }

    private agregarUnico(lista: string[], valor: string | null | undefined): void {
        const nombre = (valor ?? '').trim();

        if (nombre && !lista.includes(nombre)) {
            lista.push(nombre);
        }
    }

    private normalizarFecha(fecha: string | null | undefined): string {
        if (!fecha) {
            return '';
        }

        return fecha.substring(0, 10);
    }

    seleccionarDia(fecha: string): void {
        this.diaSeleccionado.set(fecha);
    }

    seleccionarCategoria(categoria: string): void {
        this.categoriaSeleccionada.set(categoria);
    }

    imprimirPrograma(): void {
        window.print();
    }

    nombreDia(fecha: string): string {
        const dia = this.dias.find(item => item.fecha === fecha);
        return dia ? dia.nombre : '';
    }

    anteriorConstancia(): void {
        if (this.indiceConstancia() > 0) {
            this.indiceConstancia.update(indice => indice - 1);
        }
    }

    siguienteConstancia(): void {
        if (this.indiceConstancia() < this.constancias().length - 1) {
            this.indiceConstancia.update(indice => indice + 1);
        }
    }

    seleccionarConstancia(indice: number): void {
        this.indiceConstancia.set(indice);
    }


    visualizarConstancia(event?: Event): void {
        event?.preventDefault();

        const correo = this.correoBusqueda().trim();

        if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            this.errorCargaConstancia.set(true);
            return;
        }

        this.visorAbierto.set(true);
        this.cargandoConstancia.set(true);
        this.errorCargaConstancia.set(false);

        this.constancias.set([]);
        this.indiceConstancia.set(0);

        this.http.get<any>(
            `http://localhost:7778/constancias/congreso/generar-constancia`,
            {
                params: { correo },
                withCredentials: true
            }
        ).pipe(
            finalize(() => this.cargandoConstancia.set(false))
        ).subscribe({
            next: (respuesta) => {
                if (!respuesta.constancias || respuesta.constancias.length === 0) {
                    this.errorCargaConstancia.set(true);
                    return;
                }

                this.constancias.set(respuesta.constancias);
                this.indiceConstancia.set(0);
                this.statusError.set(null);
            },
            error: (error: HttpErrorResponse) => {
                this.errorCargaConstancia.set(true);
                this.constancias.set([]);
                this.indiceConstancia.set(0);
                this.statusError.set(error.status);

                this.mensajeError.set(
                    error.error?.mensaje || 'No fue posible consultar las constancias.'
                );
            }
        });
    }

    errorConstancia(): void {
        this.cargandoConstancia.set(false);
        this.errorCargaConstancia.set(true);
    }

    cerrarVisor(): void {
        this.visorAbierto.set(false);
        this.constancias.set([]);
        this.indiceConstancia.set(0);
        this.errorCargaConstancia.set(false);
    }

}