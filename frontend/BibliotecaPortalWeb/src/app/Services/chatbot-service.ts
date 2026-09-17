import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API } from '../Core/Constants/api.constants';

export interface ChatbotMessage {
    mensaje: string;
    sessionId: string;
}

export interface ChatbotResponse {
    respuesta: string;
}

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {

    private readonly http = inject(HttpClient);

    enviarMensaje(data: ChatbotMessage): Observable<ChatbotResponse> {
        return this.http.post<ChatbotResponse>(
            `${API}/chatbot`,
            data,
            {
                withCredentials: true
            }
        );
    }
}

