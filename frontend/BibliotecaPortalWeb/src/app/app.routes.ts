import { Routes } from '@angular/router';
import { LoginComponent } from './Modulos/login/login-component';
import { RegistroUsuariosComponent } from './Modulos/registro-usuarios/registro-usuarios-component';
import { InicioComponent } from './Modulos/inicio/inicio-component';
import { MisionVisionComponent } from './Modulos/mision-vision/mision-vision-component';
import { HistoriaUniversidadComponent } from './Modulos/historia-universidad/historia-universidad-component';
import { BibliotecaCentralComponent } from './Modulos/biblioteca-central/biblioteca-central-component';
import { CongresosComponent } from './Formularios/congresos/congresos-component';

export const routes: Routes = [
    { path: '', component: InicioComponent, title: 'inicio' },
    { path: 'login', component: LoginComponent, title: 'login' },
    { path: 'registro-usuarios', component: RegistroUsuariosComponent, title: 'registro-usuarios' },
    { path: 'mision-vision', component: MisionVisionComponent, title: 'mision-vision' },
    { path: 'historia-universidad', component: HistoriaUniversidadComponent, title: 'historia-universidad' },
    { path: 'biblioteca-central', component: BibliotecaCentralComponent, title: 'biblioteca-central' },
    { path: 'registro-congresos', component: CongresosComponent, title: 'congresos' },
    
];