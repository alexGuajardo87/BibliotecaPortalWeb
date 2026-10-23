
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, switchMap } from 'rxjs';
import { AUTH_URL, COOKIE } from '../Core/Constants/api.constants'; 

@Injectable({
    providedIn: 'root'
})
export class AuthSessionService {
    private readonly http = inject(HttpClient);
    private inicializacion$?: Observable<any>;

    inicializarSesion(): Observable<any> {
        if (!this.inicializacion$) {
            this.inicializacion$ = this.http.get(
                `${COOKIE}/sanctum/csrf-cookie`,
                { withCredentials: true }
            ).pipe(
                switchMap(() =>
                    this.http.post(
                        `${AUTH_URL}/web`,
                        {},
                        { withCredentials: true }
                    )
                ),
                shareReplay(1)
            );
        }

        return this.inicializacion$;
    }
}
