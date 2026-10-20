
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChatbotService } from '../Services/chatbot-service';

type TipoMultimedia = 'youtube' | 'directo' | 'facebook-video' | 'facebook-post' | 'imagen';

interface MensajeChat {
    tipo: 'usuario' | 'bot';
    texto: string;
    hora: Date;
    mediaTipo?: TipoMultimedia;
    mediaUrl?: string;
    mediaEmbedUrl?: SafeResourceUrl;
}

interface ChatbotResponse {
    response?: string;
    respuesta?: string;
    message?: string;
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
    private readonly sanitizer = inject(DomSanitizer);

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
                   `📚 BIBLIOBOT

                    ━━━━━━━━━━━━━━━━━━━━━
                        MENÚ PRINCIPAL
                    ━━━━━━━━━━━━━━━━━━━━━

                    📖 BIBLIOTECAS
                    └─ Horarios y ubicaciones
                        ├─ 🕐 h1. Horario de Culiacán
                        ├─ 🕐 h2. Horario de Los Mochis
                        └─ 🕐 h3. Horario de Mazatlán

                    🏛️ SERVICIOS BIBLIOTECARIOS
                    ├─ 🪪 s1. Credenciales
                    └─ 🧭 s2. Visitas guiadas

                    📋 TRÁMITES Y NORMATIVIDAD
                    └─ Constancia de No Adeudo Bibliotecario
                        ├─ 💰 c1. Costo de la constancia
                        ├─ 📝 c2. Manual para solicitar la constancia
                        └─ 🎥 c3. Video tutorial para solicitar la constancia

                    ━━━━━━━━━━━━━━━━━━━━━
                    💬 Escribe el código o nombre de la opción que deseas consultar.

                    ↩️ Escribe "menú" en cualquier momento para regresar al inicio.`,
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
                const datos = respuesta as ChatbotResponse | null;
                const textoRespuesta =
                    datos?.response ??
                    datos?.respuesta ??
                    datos?.message ??
                    '';

                const textoFinal =
                    typeof textoRespuesta === 'string' && textoRespuesta.trim()
                        ? textoRespuesta.trim()
                        : 'No se recibió una respuesta del servidor.';

                this.mensajes.update(lista => [
                    ...lista,
                    this.crearMensajeBot(textoFinal)
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

    private crearMensajeBot(textoOriginal: string): MensajeChat {
        const mensaje: MensajeChat = {
            tipo: 'bot',
            texto: textoOriginal,
            hora: new Date()
        };

        const coincidencias = textoOriginal.match(/https?:\/\/[^\s<>"']+/gi) ?? [];

        for (const coincidencia of coincidencias) {
            const url = coincidencia.replace(/[),.!?;]+$/, '');

            if (this.esImagenDirecta(url)) {
                mensaje.mediaTipo = 'imagen';
                mensaje.mediaUrl = url;
                mensaje.texto = this.quitarUrl(textoOriginal, coincidencia);
                return mensaje;
            }

            const youtubeId = this.obtenerYoutubeId(url);

            if (youtubeId) {
                mensaje.mediaTipo = 'youtube';
                mensaje.mediaEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                    `https://www.youtube-nocookie.com/embed/${youtubeId}`
                );
                mensaje.texto = this.quitarUrl(textoOriginal, coincidencia);
                return mensaje;
            }

            if (this.esEnlaceFacebook(url)) {
                const tipo = this.esVideoFacebook(url)
                    ? 'facebook-video'
                    : 'facebook-post';

                const plugin = tipo === 'facebook-video'
                    ? 'https://www.facebook.com/plugins/video.php'
                    : 'https://www.facebook.com/plugins/post.php';

                const embedUrl =
                    `${plugin}?href=${encodeURIComponent(url)}&show_text=false&width=500`;

                mensaje.mediaTipo = tipo;
                mensaje.mediaEmbedUrl =
                    this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
                mensaje.texto = this.quitarUrl(textoOriginal, coincidencia);
                return mensaje;
            }

            if (this.esVideoDirecto(url)) {
                mensaje.mediaTipo = 'directo';
                mensaje.mediaUrl = url;
                mensaje.texto = this.quitarUrl(textoOriginal, coincidencia);
                return mensaje;
            }
        }

        return mensaje;
    }

    private quitarUrl(texto: string, url: string): string {
        return texto
            .replace(url, '')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }

    private esEnlaceFacebook(url: string): boolean {
        try {
            const host = new URL(url).hostname.toLowerCase();

            return host === 'facebook.com' ||
                host.endsWith('.facebook.com') ||
                host === 'fb.watch' ||
                host.endsWith('.fb.watch');
        } catch {
            return false;
        }
    }

    private esVideoFacebook(url: string): boolean {
        try {
            const parsed = new URL(url);
            const ruta = parsed.pathname.toLowerCase();

            return parsed.hostname.toLowerCase().endsWith('fb.watch') ||
                ruta.includes('/watch') ||
                ruta.includes('/videos/') ||
                ruta.includes('/reel/') ||
                ruta.includes('/reels/') ||
                ruta.includes('/live/');
        } catch {
            return false;
        }
    }

    private esImagenDirecta(url: string): boolean {
        try {
            const parsed = new URL(url);

            return /\.(png|jpe?g|gif|webp|avif|bmp)$/i.test(parsed.pathname);
        } catch {
            return false;
        }
    }

    private esVideoDirecto(url: string): boolean {
        try {
            const parsed = new URL(url);

            return /\.(mp4|webm|ogg|mov|m4v)$/i.test(parsed.pathname);
        } catch {
            return false;
        }
    }

    private obtenerYoutubeId(url: string): string | null {
        try {
            const parsed = new URL(url);
            const host = parsed.hostname.toLowerCase();
            let id = '';

            if (host === 'youtu.be') {
                id = parsed.pathname.split('/').filter(Boolean)[0] ?? '';
            } else if (
                host.includes('youtube.com') ||
                host.includes('youtube-nocookie.com')
            ) {
                if (parsed.pathname === '/watch') {
                    id = parsed.searchParams.get('v') ?? '';
                } else if (/^\/(embed|shorts|live)\//.test(parsed.pathname)) {
                    id = parsed.pathname.split('/')[2] ?? '';
                }
            }

            return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
        } catch {
            return null;
        }
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

        localStorage.setItem('chatbot_session_id', nuevo);

        return nuevo;
    }
}
