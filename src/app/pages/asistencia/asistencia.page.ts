import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage {
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  mensaje: string = '';
  nombreUsuario: string = '';

  interval: any;

  constructor(private navCtrl: NavController) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.nombreUsuario = storedUser;
    } else {
      this.nombreUsuario = 'Usuario Invitado'; 
    }
  }

  // Función para marcar la entrada
  marcarEntrada() {
    this.detenerCronometro(); // Detener cronómetro si está en marcha
    this.iniciarCronometro(); // Iniciar el cronómetro desde cero
    this.mensaje = 'Entrada Registrada'; // Mostrar mensaje de entrada registrada
    setTimeout(() => {
      this.mensaje = ''; // Limpiar mensaje después de 3 segundos
    }, 3000);
  }

  // Función para marcar la salida
  marcarSalida() {
    this.detenerCronometro(); // Detener el cronómetro
    this.horas = 0; // Reiniciar horas
    this.minutos = 0; // Reiniciar minutos
    this.segundos = 0; // Reiniciar segundos
    this.mensaje = 'Salida Registrada'; // Mostrar mensaje de salida registrada
    setTimeout(() => {
      this.mensaje = ''; // Limpiar mensaje después de 3 segundos
    }, 3000);
  }

  // Función para iniciar el cronómetro
  iniciarCronometro() {
    this.interval = setInterval(() => {
      this.segundos++;
      if (this.segundos === 60) {
        this.segundos = 0;
        this.minutos++;
      }
      if (this.minutos === 60) {
        this.minutos = 0;
        this.horas++;
      }
    }, 1000);
  }

  // Función para detener el cronómetro
  detenerCronometro() {
    clearInterval(this.interval);
  }

  // Función para cerrar sesión
  cerrarSesion() {
    localStorage.clear(); // Limpiar datos almacenados localmente
    this.navCtrl.navigateRoot('/login'); // Navegar de regreso a la página de login
  }
}
