import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

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
  imports: [CommonModule,DatePipe],
  templateUrl: './conlainuas-component.html',
  styleUrl: './conlainuas-component.css',
})
export class ConlainuasComponent {
    readonly fechaInicio = '2026-10-26';
    readonly fechaFin = '2026-10-30';

    readonly categorias = [
        'Todas',
        'Ponentes',
        'Presentador de Revista',
        'Presentador de libro'
    ];

    readonly dias = [
        { fecha: '2026-10-26', nombre: 'Lunes', numero: 26 },
        { fecha: '2026-10-27', nombre: 'Martes', numero: 27 },
        { fecha: '2026-10-28', nombre: 'Miércoles', numero: 28 },
        { fecha: '2026-10-29', nombre: 'Jueves', numero: 29 },
        { fecha: '2026-10-30', nombre: 'Viernes', numero: 30 }
    ];

    diaSeleccionado = '2026-10-26';
    categoriaSeleccionada = 'Todas';

    actividades: ActividadCongreso[] = [
        {
            id: 1,
            fecha: '2026-10-26',
            horaInicio: '09:00',
            horaFin: '09:30',
            categoria: 'Ponentes',
            titulo: 'Inauguración del congreso',
            participante: 'Comité organizador',
            lugar: 'Auditorio principal',
            descripcion: 'Bienvenida y presentación de las actividades del congreso.'
        },
        {
            id: 2,
            fecha: '2026-10-26',
            horaInicio: '09:30',
            horaFin: '10:30',
            categoria: 'Ponentes',
            titulo: 'Bibliotecas y transformación digital',
            participante: 'Dra. María Fernanda López',
            lugar: 'Auditorio principal',
            descripcion: 'Conferencia sobre los retos de la transformación digital en las bibliotecas universitarias.'
        },
        {
            id: 3,
            fecha: '2026-10-26',
            horaInicio: '10:45',
            horaFin: '11:30',
            categoria: 'Presentador de Revista',
            titulo: 'Presentación de revista académica',
            participante: 'Dr. Carlos Hernández',
            lugar: 'Sala de conferencias',
            descripcion: 'Presentación de una publicación académica y sus líneas editoriales.'
        },
        {
            id: 4,
            fecha: '2026-10-26',
            horaInicio: '11:30',
            horaFin: '12:30',
            categoria: 'Presentador de libro',
            titulo: 'Nuevas perspectivas de investigación',
            participante: 'Mtra. Ana Martínez',
            lugar: 'Sala de conferencias',
            descripcion: 'Presentación editorial y diálogo con los asistentes.'
        },
        {
            id: 5,
            fecha: '2026-10-27',
            horaInicio: '09:00',
            horaFin: '10:00',
            categoria: 'Ponentes',
            titulo: 'Acceso abierto y comunicación científica',
            participante: 'Dr. Juan Pérez',
            lugar: 'Auditorio principal',
            descripcion: 'Panorama del acceso abierto y la difusión de la producción científica.'
        },
        {
            id: 6,
            fecha: '2026-10-27',
            horaInicio: '10:15',
            horaFin: '11:00',
            categoria: 'Presentador de Revista',
            titulo: 'Revistas universitarias y difusión del conocimiento',
            participante: 'Mtra. Laura García',
            lugar: 'Sala de conferencias',
            descripcion: 'Experiencias editoriales en revistas universitarias.'
        },
        {
            id: 7,
            fecha: '2026-10-27',
            horaInicio: '11:15',
            horaFin: '12:15',
            categoria: 'Presentador de libro',
            titulo: 'Novedades editoriales universitarias',
            participante: 'Dr. Roberto Sánchez',
            lugar: 'Sala de conferencias',
            descripcion: 'Presentación de novedades editoriales y conversación con el autor.'
        },
        {
            id: 8,
            fecha: '2026-10-28',
            horaInicio: '09:00',
            horaFin: '10:00',
            categoria: 'Ponentes',
            titulo: 'Innovación en los servicios bibliotecarios',
            participante: 'Dra. Gabriela Torres',
            lugar: 'Auditorio principal',
            descripcion: 'Nuevas herramientas y estrategias para los servicios bibliotecarios.'
        },
        {
            id: 9,
            fecha: '2026-10-28',
            horaInicio: '10:15',
            horaFin: '11:00',
            categoria: 'Presentador de Revista',
            titulo: 'Investigación y publicaciones periódicas',
            participante: 'Mtro. Daniel Ruiz',
            lugar: 'Sala de conferencias',
            descripcion: 'Importancia de las publicaciones periódicas en la investigación.'
        },
        {
            id: 10,
            fecha: '2026-10-28',
            horaInicio: '11:15',
            horaFin: '12:15',
            categoria: 'Presentador de libro',
            titulo: 'Presentación de obra de investigación',
            participante: 'Dra. Elena Cruz',
            lugar: 'Sala de conferencias',
            descripcion: 'Presentación de una obra académica y sus principales aportaciones.'
        },
        {
            id: 11,
            fecha: '2026-10-29',
            horaInicio: '09:00',
            horaFin: '10:00',
            categoria: 'Ponentes',
            titulo: 'Preservación del patrimonio documental',
            participante: 'Dra. Patricia Medina',
            lugar: 'Auditorio principal',
            descripcion: 'Estrategias para conservar y difundir el patrimonio documental.'
        },
        {
            id: 12,
            fecha: '2026-10-29',
            horaInicio: '10:15',
            horaFin: '11:00',
            categoria: 'Presentador de Revista',
            titulo: 'Publicación científica en la universidad',
            participante: 'Mtro. Miguel Flores',
            lugar: 'Sala de conferencias',
            descripcion: 'Procesos editoriales y oportunidades para la publicación científica.'
        },
        {
            id: 13,
            fecha: '2026-10-29',
            horaInicio: '11:15',
            horaFin: '12:15',
            categoria: 'Presentador de libro',
            titulo: 'Presentación de libro especializado',
            participante: 'Mtra. Sofía Ramírez',
            lugar: 'Sala de conferencias',
            descripcion: 'Presentación de una publicación especializada.'
        },
        {
            id: 14,
            fecha: '2026-10-30',
            horaInicio: '09:00',
            horaFin: '10:00',
            categoria: 'Ponentes',
            titulo: 'El futuro de las bibliotecas universitarias',
            participante: 'Dr. Andrés Navarro',
            lugar: 'Auditorio principal',
            descripcion: 'Tendencias y perspectivas para las bibliotecas universitarias.'
        },
        {
            id: 15,
            fecha: '2026-10-30',
            horaInicio: '10:15',
            horaFin: '11:00',
            categoria: 'Presentador de Revista',
            titulo: 'Revistas académicas: retos y oportunidades',
            participante: 'Dra. Claudia Vega',
            lugar: 'Sala de conferencias',
            descripcion: 'Retos de las publicaciones académicas en el entorno actual.'
        },
        {
            id: 16,
            fecha: '2026-10-30',
            horaInicio: '11:15',
            horaFin: '12:15',
            categoria: 'Presentador de libro',
            titulo: 'Presentación editorial y diálogo con autores',
            participante: 'Mtro. Eduardo López',
            lugar: 'Sala de conferencias',
            descripcion: 'Encuentro con autores y presentación de novedades editoriales.'
        },
        {
            id: 17,
            fecha: '2026-10-30',
            horaInicio: '12:30',
            horaFin: '13:00',
            categoria: 'Ponentes',
            titulo: 'Clausura del congreso',
            participante: 'Comité organizador',
            lugar: 'Auditorio principal',
            descripcion: 'Cierre de actividades y agradecimientos a los participantes.'
        }
    ];

    get actividadesFiltradas(): ActividadCongreso[] {
        return this.actividades
            .filter(actividad => actividad.fecha === this.diaSeleccionado)
            .filter(actividad =>
                this.categoriaSeleccionada === 'Todas' ||
                actividad.categoria === this.categoriaSeleccionada
            )
            .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
    }

    get totalActividadesDia(): number {
        return this.actividades.filter(
            actividad => actividad.fecha === this.diaSeleccionado
        ).length;
    }

    seleccionarDia(fecha: string): void {
        this.diaSeleccionado = fecha;
    }

    seleccionarCategoria(categoria: string): void {
        this.categoriaSeleccionada = categoria;
    }

    imprimirPrograma(): void {
        window.print();
    }

    nombreDia(fecha: string): string {
        const dia = this.dias.find(item => item.fecha === fecha);
        return dia ? dia.nombre : '';
    }
}
