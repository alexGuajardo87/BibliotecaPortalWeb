import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-historia-universidad-component',
  imports: [ButtonModule],
  templateUrl: './historia-universidad-component.html',
  styleUrl: './historia-universidad-component.css',
})
export class HistoriaUniversidadComponent {

  scrollTo(id: string): void {
    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
  }

}
