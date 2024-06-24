import { Component } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage {
  historial: { entrada: string, salida: string }[] = [];

  constructor() {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.historial = JSON.parse(localStorage.getItem('historial') || '[]');
  }
}
