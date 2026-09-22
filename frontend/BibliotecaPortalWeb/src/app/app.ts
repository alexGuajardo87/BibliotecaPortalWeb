import { Component, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuItem, MegaMenuItem } from 'primeng/api';
import { ChatbotComponent } from './Chatbot/chatbot-component';
import { SitiosInteresComponent } from './Modulos/sitios-interes/sitios-interes-component';
import { AUTH_URL, COOKIE } from './Core/Constants/api.constants';

declare function gtag(...args: any[]): void;

@Component({
    selector: 'app-root',
    imports: [
        RouterModule,
        ChatbotComponent,
        MenubarModule,
        MegaMenuModule,
        SitiosInteresComponent
    ],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {

    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);

    imagenHover = signal<string | null>(null);

    items: MenuItem[] = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            routerLink: ['']
        },
        {
            label: 'Acerca De',
            icon: 'pi pi-info-circle',
            items: [
                {
                    label: 'Misión y Visión',
                    icon: 'pi pi-eye',
                    routerLink: ['/mision-vision']
                },
                {
                    label: 'Breve historia de la Universidad Autónoma de Sinaloa',
                    icon: 'pi pi-history',
                    routerLink: ['/historia-universidad']
                },
                {
                    label: 'Galería de Rectores',
                    icon: 'pi pi-users',
                    routerLink: ['/galeria-rectores']
                },
                {
                    label: 'Galería de Doctores Honoris Causa',
                    icon: 'pi pi-star',
                    routerLink: ['/galeria-honoris-causa']
                },
                {
                    label: 'Organigrama',
                    icon: 'pi pi-sitemap',
                    routerLink: ['/organigrama']
                }
            ]
        },
        {
            label: 'SIBIUAS',
            icon: 'pi pi-database',
            items: [
                {
                    label: 'Biblioteca Central "Lic. Eustaquio Buelna Pérez"',
                    icon: 'pi pi-building',
                    routerLink: ['/biblioteca-central']
                },
                {
                    label: 'Coordinación de Desarrollo de Colecciones',
                    icon: 'pi pi-book',
                    items: [
                        {
                            label: 'Selección y adquisición',
                            icon: 'pi pi-shopping-cart',
                            routerLink: ['/colecciones-selección-adquisición']
                        },
                        {
                            label: 'Donaciones',
                            icon: 'pi pi-gift',
                            routerLink: ['/colecciones-donaciones']
                        }
                    ]
                },
                {
                    label: 'Coordinación de Procesos Técnicos',
                    icon: 'pi pi-cog',
                    items: [
                        {
                            label: 'Bibliotecas Departamentales',
                            icon: 'pi pi-building',
                            routerLink: ['/procesos-bibliotecas']
                        },
                        {
                            label: 'Sistemas y soporte técnico',
                            icon: 'pi pi-desktop',
                            routerLink: ['/procesos-sistemas']
                        },
                        {
                            label: 'Análisis Bibliográfico',
                            icon: 'pi pi-search',
                            routerLink: ['/procesos-análisis']
                        },
                        {
                            label: 'Restauración Bibliográfica',
                            icon: 'pi pi-wrench',
                            routerLink: ['/procesos-restauración']
                        }
                    ]
                },
                {
                    label: 'Coordinación de Servicios al Público',
                    icon: 'pi pi-users',
                    items: [
                        {
                            label: 'Área de Consulta',
                            icon: 'pi pi-book',
                            routerLink: ['/servicios-consulta']
                        },
                        {
                            label: 'Hemeroteca',
                            icon: 'pi pi-folder',
                            routerLink: ['/servicios-hemeroteca']
                        },
                        {
                            label: 'Cubículos',
                            icon: 'pi pi-users',
                            routerLink: ['/servicios-cubículos']
                        },
                        {
                            label: 'Área Infantil',
                            icon: 'pi pi-heart',
                            routerLink: ['/servicios-infantil']
                        },
                        {
                            label: 'Auditorio',
                            icon: 'pi pi-microphone',
                            routerLink: ['/servicios-auditorio']
                        },
                        {
                            label: 'Tratado de Marrakech',
                            icon: 'pi pi-globe',
                            routerLink: ['/servicios-marrakech']
                        },
                        {
                            label: 'Área Virtual',
                            icon: 'pi pi-desktop',
                            routerLink: ['/servicios-virtual']
                        },
                        {
                            label: 'Formación de Usuario',
                            icon: 'pi pi-graduation-cap',
                            routerLink: ['/servicios-formación']
                        },
                        {
                            label: 'Visitas Guiadas',
                            icon: 'pi pi-map',
                            routerLink: ['/servicios-visitas']
                        }
                    ]
                }
            ]
        },
        {
            label: 'Repositorios Institucionales',
            icon: 'pi pi-database',
            items: [
                {
                    label: 'Repositorio de Tesis',
                    icon: 'pi pi-external-link',
                    url: 'https://tesis.uas.edu.mx/home',
                    target: '_blank'
                },
                {
                    label: 'Repositorio de Revistas',
                    icon: 'pi pi-external-link',
                    url: 'https://revistas.uas.edu.mx/index.php',
                    target: '_blank'
                }
            ]
        },
        {
            label: 'Servicios para usuarios',
            icon: 'pi pi-users',
            items: [
                {
                    label: 'Solicitud de cursos',
                    icon: 'pi pi-book',
                    routerLink: ['/servicios-usuarios-cursos']
                },
                {
                    label: 'Solicitud de auditorio',
                    icon: 'pi pi-microphone',
                    routerLink: ['/servicios-usuarios-auditorio']
                }
            ]
        },
        {
            label: 'Administración',
            icon: 'pi pi-cog',
            items: [
                {
                    label: 'Catálogos',
                    icon: 'pi pi-database',
                    items: [
                        {
                            label: 'Campos',
                            icon: 'pi pi-list',
                            routerLink: ['/catalogos/campos']
                        },
                        {
                            label: 'Categorías',
                            icon: 'pi pi-tags',
                            routerLink: ['/catalogos/categorias']
                        },
                        {
                            label: 'Tipos',
                            icon: 'pi pi-table',
                            routerLink: ['/catalogos/tipos']
                        }
                    ]
                },
                {
                    label: 'Reportes',
                    icon: 'pi pi-chart-bar',
                    items: [
                        {
                            label: 'Reporte general',
                            icon: 'pi pi-file',
                            routerLink: ['/reportes/general']
                        },
                        {
                            label: 'Estadísticas',
                            icon: 'pi pi-chart-line',
                            routerLink: ['/reportes/estadisticas']
                        }
                    ]
                },
                {
                    label: 'Usuarios',
                    icon: 'pi pi-users',
                    routerLink: ['/admin/usuarios']
                },
                {
                    label: 'Roles',
                    icon: 'pi pi-shield',
                    routerLink: ['/admin/roles']
                },
                {
                    label: 'Permisos',
                    icon: 'pi pi-lock',
                    routerLink: ['/admin/permisos']
                }
            ]
        }
    ];

    itemsV: MegaMenuItem[] = [
        {
            label: 'SIBIUAS',
            image: '/cover_issue_204_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/SIBIUAS',
            target: '_blank'
        },
        {
            label: 'ACBIOMEX',
            image: '/cover_issue_208_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/ACBIOMEX',
            target: '_blank'
        },
        {
            label: 'Buiyya',
            image: '/cover_issue_205_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/Buiyya',
            target: '_blank'
        },
        {
            label: 'ESCRIPTA',
            image: '/cover_issue_193_es.jpg',
            url: 'https://revistas.uas.edu.mx/index.php/ESCRIPTA',
            target: '_blank'
        },
        {
            label: 'RI',
            image: '/cover_issue_190_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/RI',
            target: '_blank'
        },
        {
            label: 'JUS',
            image: '/cover_issue_191_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/JUS',
            target: '_blank'
        },
        {
            label: 'IJISTA',
            image: '/cover_issue_197_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/IJISTA',
            target: '_blank'
        },
        {
            label: 'QBU',
            image: '/cover_issue_121_es.jpg',
            url: 'https://revistas.uas.edu.mx/index.php/QBU',
            target: '_blank'
        },
        {
            label: 'CIMAR',
            image: '/cover_issue_196_es.jpg',
            url: 'https://revistas.uas.edu.mx/index.php/CIMAR',
            target: '_blank'
        },
        {
            label: 'FEMUAS',
            image: '/cover_issue_207_es.jpg',
            url: 'https://revistas.uas.edu.mx/index.php/FEMUAS',
            target: '_blank'
        },
        {
            label: 'RITUAS',
            image: '/journalThumbnail_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/RITUAS',
            target: '_blank'
        },
        {
            label: 'RECIE',
            image: '/cover_issue_188_es.jpg',
            url: 'https://revistas.uas.edu.mx/index.php/RECIE',
            target: '_blank'
        },
        {
            label: 'REVOUAS',
            image: '/cover_issue_189_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/REVOUAS',
            target: '_blank'
        },
        {
            label: 'RECEAUAS',
            image: '/cover_issue_192_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/RECEAUAS',
            target: '_blank'
        },
        {
            label: 'CYU',
            image: '/cover_issue_39_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/CYU',
            target: '_blank'
        },
        {
            label: 'ARENAS',
            image: '/journalThumbnail_es.png',
            url: 'https://revistas.uas.edu.mx/index.php/ARENAS',
            target: '_blank'
        },
        {
            label: 'ACCED',
            image: '/journalThumbnail_es (1).png',
            url: 'https://revistas.uas.edu.mx/index.php/ACCED',
            target: '_blank'
        },
        {
            label: 'Psico-logos',
            image: 'journalThumbnail_es (2).png',
            url: 'https://revistas.uas.edu.mx/index.php/Psico-logos',
            target: '_blank'
        },
        {
            label: 'RIIBIOS',
            image: 'journalThumbnail_es (4).png',
            url: 'https://revistas.uas.edu.mx/index.php/RIIBIOS',
            target: '_blank'
        },
        {
            label: 'IDEAS',
            image: 'journalThumbnail_es (5).png',
            url: 'https://revistas.uas.edu.mx/index.php/IDEAS',
            target: '_blank'
        },
        {
            label: 'uasjmr',
            image: 'journalThumbnail_es (6).png',
            url: 'https://revistas.uas.edu.mx/index.php/uasjmr',
            target: '_blank'
        },
        {
            label: 'REVOECI',
            image: 'journalThumbnail_es (7).png',
            url: 'https://revistas.uas.edu.mx/index.php/REVOECI',
            target: '_blank'
        },
        {
            label: 'EDUMORPHOSIS',
            image: 'journalThumbnail_es (8).png',
            url: 'https://revistas.uas.edu.mx/index.php/EDUMORPHOSIS',
            target: '_blank'
        }
    ];

    itemsVRight: MegaMenuItem[] = [
        {
            label: 'SIBIUAS',
            image: '/AURA-MAR.png',
            url: 'https://aura.amelica.org/index.html',
            target: '_blank'
        },
        {
            label: 'ACBIOMEX',
            image: '/CC-MAR.png',
            url: 'https://creativecommons.org/',
            target: '_blank'
        },
        {
            label: 'Buiyya',
            image: '/DOA_Logo3-MAR.png',
            url: '',
            target: '_blank'
        },
        {
            label: 'ESCRIPTA',
            image: '/DOAJ-MAR.png',
            url: 'https://doaj.org/',
            target: '_blank'
        },
        {
            label: 'RI',
            image: '/Facebook-Logo-2019-MAR.png',
            url: 'https://www.facebook.com/',
            target: '_blank'
        },
        {
            label: 'JUS',
            image: '/Google Scholar-MAR.png',
            url: 'https://scholar.google.com/',
            target: '_blank'
        },
        {
            label: 'IJISTA',
            image: '/lacli-index-MAR.webp',
            url: 'https://lacli.info/library.html?q=Universidad+Autónoma+de+Sinaloa',
            target: '_blank'
        },
        {
            label: 'QBU',
            image: '/Latindex-MAR.png',
            url: 'https://latindex.org/latindex/inicio',
            target: '_blank'
        },
        {
            label: 'CIMAR',
            image: '/LatinRev-MAR.png',
            url: 'https://latinrev.flacso.org.ar/',
            target: '_blank'
        },
        {
            label: 'FEMUAS',
            image: '/LivRe-MAR.png',
            url: 'https://livre.cnen.gov.br/Inicial.asp',
            target: '_blank'
        },
        {
            label: 'RITUAS',
            image: '/Logo AmeliCA-MAR.png',
            url: 'https://amelica.org/',
            target: '_blank'
        },
        {
            label: 'RECIE',
            image: '/Logo-blue Vlex-MAR.png',
            url: 'https://vlex.com.mx/',
            target: '_blank'
        },
        {
            label: 'REVOUAS',
            image: '/miar-MAR.png',
            url: 'https://miar.ub.edu/',
            target: '_blank'
        },
        {
            label: 'RECEAUAS',
            image: '/new-instagram-text-logo-MAR.png',
            url: 'https://www.instagram.com/',
            target: '_blank'
        },
        {
            label: 'CYU',
            image: '/REDIB-MAR.png',
            url: 'https://static.redib.org/',
            target: '_blank'
        },
        {
            label: 'ARENAS',
            image: '/Road-MAR.png',
            url: 'https://road.issn.org/',
            target: '_blank'
        },
        {
            label: 'Psico-logos',
            image: 'zenodo_in_blue-MAR.png',
            url: 'https://zenodo.org/',
            target: '_blank'
        }
    ];

    ngOnInit(): void {
        this.configurarGoogleAnalytics();

        this.http.get(`${COOKIE}/sanctum/csrf-cookie`, {
            withCredentials: true
        }).subscribe({
            next: () => {
                const body = {};

                this.http.post(`${AUTH_URL}/web`, body, {
                    withCredentials: true
                }).subscribe({
                    next: (respuesta: any) => {
                        console.log(respuesta.message);
                    },
                    error: (err) => {
                        console.log(err.error?.message);
                    }
                });
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    private configurarGoogleAnalytics(): void {
        this.router.events
            .pipe(
                filter(
                    event => event instanceof NavigationEnd
                )
            )
            .subscribe(
                (event: NavigationEnd) => {
                    gtag(
                        'config',
                        'G-EJ3BHZKVW9',
                        {
                            page_path: event.urlAfterRedirects
                        }
                    );
                }
            );
    }

    mostrarImagenGrande(item: any): void {
        if (!item?.image) {
            return;
        }

        this.imagenHover.set(item.image);
    }

    mantenerImagenGrande(): void {
    }

    ocultarImagenGrande(): void {
        this.imagenHover.set(null);
    }
}