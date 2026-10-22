import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CONGRESO } from '../Core/Constants/api.constants';
export interface CronogramaRegistro {
    Id: number;
    Dia: string;
    Hora: string;
    Tipo: string;
    TituloOrganizacion: string;
    Eje: string;
    Mesa: string;
    NombreRevista: string;
    Presentador: string;
    EditorJefe: string;
    TituloLibro: string;
    AutorLibro: string;
    CoautorLibro1: string;
    CoautorLibro2: string;
    PresentadorLibro: string;
    TituloPonencia: string;
    PresentadorPonenecia: string;
    CoautorPon1: string;
    CoautorPon2: string;
    CoautorPon3: string;
    CoautorPon4: string;
    Afiliacion: string;
    Pais: string;
}

export interface CronogramaRespuesta {
    data: CronogramaRegistro[];
}

@Injectable({
    providedIn: 'root'
})
export class CronogramaService {
    private readonly http = inject(HttpClient);
    private readonly endpoint = `${CONGRESO}/listado`;

    obtenerCronograma(): Observable<CronogramaRespuesta> {
        return this.http.get<CronogramaRespuesta>(this.endpoint, {
            withCredentials: true
        });
    }
}