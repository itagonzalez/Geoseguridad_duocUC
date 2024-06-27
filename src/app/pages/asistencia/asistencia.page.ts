import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrarHistorialService } from '../../services/historial/registrar-historial.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  nombreUsuario: string = '';
  currentDate: Date = new Date();
  mensaje: string = '';
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  timer: any;

  constructor(private router: Router, private historialService: RegistrarHistorialService) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('user') || 'Usuario';
  }

  startCronometro() {
    this.timer = setInterval(() => {
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

  marcarEntrada() {
    // Inicia el cronómetro al marcar entrada si no está iniciado
    if (!this.timer) {
      this.startCronometro();
    }

    const entrada = new Date();
    this.historialService.agregarMarca(entrada, null);
    this.mensaje = 'Entrada registrada';
    setTimeout(() => (this.mensaje = ''), 3000);
  }

  marcarSalida() {
    const salida = new Date();
    this.historialService.agregarMarca(null, salida);
    clearInterval(this.timer);
    this.timer = null; // Reinicia el timer a null cuando se marca salida
    this.mensaje = 'Salida registrada';
    setTimeout(() => (this.mensaje = ''), 3000);
  }

  cerrarSesion() {    
    this.router.navigate(['/login']);
  }
}
