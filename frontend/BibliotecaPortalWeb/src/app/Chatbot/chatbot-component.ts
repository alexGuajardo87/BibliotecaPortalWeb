import {
    Component,
    ElementRef,
    ViewChild,
    effect,
    inject,
    OnInit,
    signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChatbotService } from '../Services/chatbot-service';

interface MensajeChat {
    tipo: 'usuario' | 'bot';
    texto: string;
    hora: Date;
}

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule
    ],
    templateUrl: './chatbot-component.html',
    styleUrl: './chatbot-component.css'
})
export class ChatbotComponent implements OnInit {

    private readonly chatbotService = inject(ChatbotService);

    @ViewChild('chatbotMessages')
    chatbotMessages!: ElementRef<HTMLDivElement>;

    abierto = signal(false);
    mensaje = '';
    cargando = signal(false);
    sessionId = '';
    mensajes = signal<MensajeChat[]>([]);

    constructor() {
        effect(() => {
            this.mensajes();

            setTimeout(() => {
                this.desplazarAlFinal();
            }, 50);
        });
    }

    ngOnInit(): void {
        this.sessionId = this.obtenerSessionId();

            this.mensajes.set([
            {
                tipo: 'bot',
                texto:
                    '📚 BIBLIOBOT\n\n' +
                    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                    '        MENÚ PRINCIPAL\n' +
                    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +

                    '📖 1. BIBLIOTECAS\n' +
                    '   └─ a. Horarios y ubicaciones\n\n' +

                    '🏛️ 2. SERVICIOS BIBLIOTECARIOS\n' +
                    '   ├─ a. Préstamo interno\n' +
                    '   ├─ b. Préstamo externo\n' +
                    '   ├─ c. Cubículos\n' +
                    '   ├─ d. Préstamo de equipo de cómputo\n' +
                    '   ├─ e. Visitas guiadas\n' +
                    '   ├─ f. Asesorías académicas\n' +
                    '   ├─ g. Auditorio\n' +
                    '   └─ h. Donación de libros\n\n' +

                    '📚 3. CATÁLOGO, LIBROS Y PRÉSTAMOS\n' +
                    '   └─ a. Buscador de libros\n\n' +

                    '💻 4. RECURSOS DIGITALES\n' +
                    '   └─ a. Laboratorios de física, química y matemáticas\n\n' +

                    '🔎 5. BÚSQUEDA DE INFORMACIÓN CIENTÍFICA\n' +
                    '   ├─ a. Bases de datos con acceso por IP institucional\n' +
                    '   └─ b. Directorio de revistas externas\n\n' +

                    '🎓 6. TESIS Y REVISTAS UAS\n' +
                    '   ├─ a. Repositorio Institucional de Tesis “Buelna”\n' +
                    '   └─ b. Repositorio Institucional de Revistas Científicas\n\n' +

                    '🎓 7. CURSOS Y CAPACITACIÓN\n' +
                    '   └─ a. Solicitud de cursos\n' +
                    '       └─ i. Cursos de IA\n\n' +

                    '📋 8. TRÁMITES Y NORMATIVIDAD\n' +
                    '   └─ a. Constancia de No Adeudo Bibliotecario\n\n' +

                    '📅 9. EVENTOS Y AVISOS\n' +
                    '   └─ a. Próximos cursos\n\n' +

                    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                    '💬 Escribe el número o nombre de la opción que deseas consultar.\n\n' +
                    '↩️ Escribe "menú" en cualquier momento para regresar al inicio.',
                hora: new Date()
            }
        ]);
    }

    toggleChat(): void {
        this.abierto.update(valor => !valor);

        if (this.abierto()) {
            setTimeout(() => {
                this.desplazarAlFinal();
            }, 100);
        }
    }

    cerrarChat(): void {
        this.abierto.set(false);
    }

    enviarMensaje(): void {
        const texto = this.mensaje.trim();

        if (!texto || this.cargando()) {
            return;
        }

        this.mensajes.update(lista => [
            ...lista,
            {
                tipo: 'usuario',
                texto,
                hora: new Date()
            }
        ]);

        this.mensaje = '';
        this.cargando.set(true);

        this.chatbotService.enviarMensaje({
            mensaje: texto,
            sessionId: this.sessionId
        }).subscribe({
            next: (respuesta) => {
                this.mensajes.update(lista => [
                    ...lista,
                    {
                        tipo: 'bot',
                        texto: respuesta.respuesta,
                        hora: new Date()
                    }
                ]);

                this.cargando.set(false);
            },
            error: () => {
                this.mensajes.update(lista => [
                    ...lista,
                    {
                        tipo: 'bot',
                        texto: 'No fue posible procesar tu mensaje. Intenta nuevamente.',
                        hora: new Date()
                    }
                ]);

                this.cargando.set(false);
            }
        });
    }

    manejarEnter(event: Event): void {
        const keyboardEvent = event as KeyboardEvent;

        if (!keyboardEvent.shiftKey) {
            keyboardEvent.preventDefault();
            this.enviarMensaje();
        }
    }

    private desplazarAlFinal(): void {
        const elemento = this.chatbotMessages?.nativeElement;

        if (!elemento) {
            return;
        }

        elemento.scrollTo({
            top: elemento.scrollHeight,
            behavior: 'smooth'
        });
    }

    private obtenerSessionId(): string {
        const existente = localStorage.getItem('chatbot_session_id');

        if (existente) {
            return existente;
        }

        const nuevo = crypto.randomUUID();

        localStorage.setItem(
            'chatbot_session_id',
            nuevo
        );

        return nuevo;
    }
}