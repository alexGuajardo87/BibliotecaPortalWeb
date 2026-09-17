import { AfterViewInit, Component } from '@angular/core';
import { Carousel } from 'primeng/carousel';

declare global {
    interface Window {
        FB: any;
    }
}

@Component({
    selector: 'app-inicio-component',
    standalone: true,
    imports: [
        Carousel
    ],
    templateUrl: './inicio-component.html',
    styleUrl: './inicio-component.css'
})
export class InicioComponent implements AfterViewInit {

    mostrarInfoTesis = false;

    items = [
        {
            titulo: 'Biblioteca Central',
            descripcion: 'Espacio principal de consulta y estudio, con un amplio acervo bibliográfico y servicios dirigidos a estudiantes, docentes e investigadores.',
            imagen: '/carrusel1.jpeg',
            icono: 'pi pi-building'
        },
        {
            titulo: 'Hemeroteca',
            descripcion: 'Consulta periódicos, revistas y publicaciones especializadas que forman parte del acervo documental de la Universidad.',
            imagen: '/carrusel2.jpg',
            icono: 'pi pi-book'
        },
        {
            titulo: 'Área Virtual',
            descripcion: 'Accede desde cualquier lugar a recursos digitales, servicios en línea, bases de datos y herramientas de apoyo para la investigación.',
            imagen: '/carrusel3.jpg',
            icono: 'pi pi-desktop'
        },
        {
            titulo: 'Archivo Histórico',
            descripcion: 'Descubre y consulta documentos, publicaciones y materiales que forman parte de la memoria histórica y del patrimonio documental de la Universidad.',
            imagen: '/carrusel4.jpg',
            icono: 'pi pi-folder-open'
        },
        {
            titulo: 'Auditorio',
            descripcion: 'Espacio destinado a conferencias, presentaciones, cursos, talleres y actividades académicas y culturales de la comunidad universitaria.',
            imagen: '/carrusel6.jpg',
            icono: 'pi pi-microphone'
        },
        {
            titulo: 'Cubículos',
            descripcion: 'Espacios destinados al estudio individual y colaborativo, ideales para realizar trabajos académicos, proyectos e investigaciones.',
            imagen: '/carrusel7.jpg',
            icono: 'pi pi-users'
        },
        {
            titulo: 'Área Infantil',
            descripcion: 'Espacio diseñado especialmente para niñas y niños, donde pueden acercarse a la lectura mediante actividades educativas, materiales bibliográficos y experiencias que fomentan su imaginación, aprendizaje y gusto por los libros.',
            imagen: '/carrusel8.jpg',
            icono: 'pi pi-users'
        },
        {
            titulo: 'Visita Guiada',
            descripcion: 'Conoce nuestras instalaciones y servicios a través de recorridos guiados por la biblioteca. Descubre sus espacios, colecciones, recursos y servicios disponibles para la comunidad universitaria y nuestros visitantes.',
            imagen: '/carrusel9.jpg',
            icono: 'pi pi-users'
        }
    ];

    ngAfterViewInit(): void {
        this.cargarFacebook();
    }

    private cargarFacebook(): void {
        if (window.FB) {
            window.FB.XFBML.parse();
            return;
        }

        const scriptExistente = document.getElementById('facebook-jssdk');

        if (scriptExistente) {
            this.esperarFacebook();
            return;
        }

        const script = document.createElement('script');

        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/es_LA/sdk.js';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';

        script.onload = () => {
            this.esperarFacebook();
        };

        document.body.appendChild(script);
    }

    private esperarFacebook(): void {
        let intentos = 0;
        const maxIntentos = 20;

        const intervalo = setInterval(() => {
            intentos++;

            if (window.FB) {
                clearInterval(intervalo);
                window.FB.XFBML.parse();
                return;
            }

            if (intentos >= maxIntentos) {
                clearInterval(intervalo);
            }
        }, 500);
    }
}