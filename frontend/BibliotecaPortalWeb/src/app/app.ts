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
import { AuthSessionService } from './Services/auth-session.service';

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
    private readonly authSession = inject(AuthSessionService);

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
                },
                {
                    label: 'Generador XML JATS',
                    icon: 'pi pi-file-edit',
                    routerLink: ['/generador-jats']
                }
            ]
        },
        {
            label: 'CONLAIN-UAS',
            icon: 'pi pi-globe',
            routerLink: ['/congreso-conlain-uas']
        }
    ];

    itemsV: MegaMenuItem[] = [
        {
            label: 'SIBIUAS',
            image: '/cover_issue_204_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/SIBIUAS',
            target: '_blank'
        },
        {
            label: 'ACBIOMEX',
            image: '/cover_issue_208_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/ACBIOMEX',
            target: '_blank'
        },
        {
            label: 'Buiyya',
            image: '/cover_issue_205_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/Buiyya',
            target: '_blank'
        },
        {
            label: 'ESCRIPTA',
            image: '/cover_issue_193_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/ESCRIPTA',
            target: '_blank'
        },
        {
            label: 'RI',
            image: '/cover_issue_190_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/RI',
            target: '_blank'
        },
        {
            label: 'JUS',
            image: '/cover_issue_191_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/JUS',
            target: '_blank'
        },
        {
            label: 'IJISTA',
            image: '/cover_issue_197_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/IJISTA',
            target: '_blank'
        },
        {
            label: 'QBU',
            image: '/cover_issue_121_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/QBU',
            target: '_blank'
        },
        {
            label: 'CIMAR',
            image: '/cover_issue_196_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/CIMAR',
            target: '_blank'
        },
        {
            label: 'FEMUAS',
            image: '/cover_issue_207_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/FEMUAS',
            target: '_blank'
        },
        {
            label: 'RITUAS',
            image: '/journalThumbnail_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/RITUAS',
            target: '_blank'
        },
        {
            label: 'RECIE',
            image: '/cover_issue_188_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/RECIE',
            target: '_blank'
        },
        {
            label: 'REVOUAS',
            image: '/cover_issue_189_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/REVOUAS',
            target: '_blank'
        },
        {
            label: 'RECEAUAS',
            image: '/cover_issue_192_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/RECEAUAS',
            target: '_blank'
        },
        {
            label: 'CYU',
            image: '/cover_issue_39_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/CYU',
            target: '_blank'
        },
        {
            label: 'ARENAS',
            image: '/journalThumbnail_es.webp',
            url: 'https://revistas.uas.edu.mx/index.php/ARENAS',
            target: '_blank'
        },
        {
            label: 'ACCED',
            image: '/journalThumbnail_es (1).webp',
            url: 'https://revistas.uas.edu.mx/index.php/ACCED',
            target: '_blank'
        },
        {
            label: 'Psico-logos',
            image: 'journalThumbnail_es (2).webp',
            url: 'https://revistas.uas.edu.mx/index.php/Psico-logos',
            target: '_blank'
        },
        {
            label: 'RIIBIOS',
            image: 'journalThumbnail_es (4).webp',
            url: 'https://revistas.uas.edu.mx/index.php/RIIBIOS',
            target: '_blank'
        },
        {
            label: 'IDEAS',
            image: 'journalThumbnail_es (5).webp',
            url: 'https://revistas.uas.edu.mx/index.php/IDEAS',
            target: '_blank'
        },
        {
            label: 'uasjmr',
            image: 'journalThumbnail_es (6).webp',
            url: 'https://revistas.uas.edu.mx/index.php/uasjmr',
            target: '_blank'
        },
        {
            label: 'REVOECI',
            image: 'journalThumbnail_es (7).webp',
            url: 'https://revistas.uas.edu.mx/index.php/REVOECI',
            target: '_blank'
        },
        {
            label: 'EDUMORPHOSIS',
            image: 'journalThumbnail_es (8).webp',
            url: 'https://revistas.uas.edu.mx/index.php/EDUMORPHOSIS',
            target: '_blank'
        }
    ];

    itemsVRight: MegaMenuItem[] = [
        {
            label: 'SIBIUAS',
            image: '/AURA-MAR.webp',
            url: 'https://aura.amelica.org/index.html',
            target: '_blank'
        },
        {
            label: 'ACBIOMEX',
            image: '/CC-MAR.webp',
            url: 'https://creativecommons.org/',
            target: '_blank'
        },
        {
            label: 'Buiyya',
            image: '/DOA_Logo3-MAR.webp',
            url: '',
            target: '_blank'
        },
        {
            label: 'ESCRIPTA',
            image: '/DOAJ-MAR.webp',
            url: 'https://doaj.org/',
            target: '_blank'
        },
        {
            label: 'RI',
            image: '/Facebook-Logo-2019-MAR.webp',
            url: 'https://www.facebook.com/',
            target: '_blank'
        },
        {
            label: 'JUS',
            image: '/Google Scholar-MAR.webp',
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
            image: '/Latindex-MAR.webp',
            url: 'https://latindex.org/latindex/inicio',
            target: '_blank'
        },
        {
            label: 'CIMAR',
            image: '/LatinRev-MAR.webp',
            url: 'https://latinrev.flacso.org.ar/',
            target: '_blank'
        },
        {
            label: 'FEMUAS',
            image: '/LivRe-MAR.webp',
            url: 'https://livre.cnen.gov.br/Inicial.asp',
            target: '_blank'
        },
        {
            label: 'RITUAS',
            image: '/Logo AmeliCA-MAR.webp',
            url: 'https://amelica.org/',
            target: '_blank'
        },
        {
            label: 'RECIE',
            image: '/Logo-blue Vlex-MAR.webp',
            url: 'https://vlex.com.mx/',
            target: '_blank'
        },
        {
            label: 'REVOUAS',
            image: '/miar-MAR.webp',
            url: 'https://miar.ub.edu/',
            target: '_blank'
        },
        {
            label: 'RECEAUAS',
            image: '/new-instagram-text-logo-MAR.webp',
            url: 'https://www.instagram.com/',
            target: '_blank'
        },
        {
            label: 'CYU',
            image: '/REDIB-MAR.webp',
            url: 'https://static.redib.org/',
            target: '_blank'
        },
        {
            label: 'ARENAS',
            image: '/Road-MAR.webp',
            url: 'https://road.issn.org/',
            target: '_blank'
        },
        {
            label: 'Psico-logos',
            image: 'zenodo_in_blue-MAR.webp',
            url: 'https://zenodo.org/',
            target: '_blank'
        }
    ];

    ngOnInit(): void {
        this.configurarGoogleAnalytics();

        this.authSession.inicializarSesion().subscribe({
            next: (respuesta: any) => {
                console.log(respuesta.message);
            },
            error: (err) => {
                console.error('Error de autenticación:', err.error?.message ?? err);
            }
        });

        /*this.http.get(`${COOKIE}/sanctum/csrf-cookie`, {
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
        });*/
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