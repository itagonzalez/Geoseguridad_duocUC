import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage {
  mensaje: string = '';
  cronometro: any;
  tiempo: number = 0;
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  entrada: string | null = null;

  constructor(private navCtrl: NavController) {}

  marcarEntrada() {
    if (!this.entrada) {
      this.entrada = new Date().toLocaleTimeString();
      this.mensaje = `Entrada registrada a las ${this.entrada}`;
      this.iniciarCronometro();
    }
  }

  marcarSalida() {
    if (this.entrada) {
      const salida = new Date().toLocaleTimeString();
      this.mensaje = `Salida registrada a las ${salida}`;
      this.detenerCronometro();
      this.guardarHistorial(this.entrada, salida);
      this.entrada = null; // Reset entrada
    }
  }

  iniciarCronometro() {
    this.resetCronometro();
    this.cronometro = setInterval(() => {
      this.tiempo++;
      this.horas = Math.floor(this.tiempo / 3600);
      this.minutos = Math.floor((this.tiempo % 3600) / 60);
      this.segundos = this.tiempo % 60;
    }, 1000);
  }

  detenerCronometro() {
    clearInterval(this.cronometro);
    this.resetCronometro();
  }

  resetCronometro() {
    this.tiempo = 0;
    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;
  }

  guardarHistorial(entrada: string, salida: string) {
    const historial = JSON.parse(localStorage.getItem('historial') || '[]');
    historial.push({ entrada, salida });
    localStorage.setItem('historial', JSON.stringify(historial));
  }

  cerrarSesion() {
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }
}
