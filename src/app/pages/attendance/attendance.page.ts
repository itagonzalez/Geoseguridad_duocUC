import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterHistoryService } from '../../services/history/register-history.service';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  userName: string = '';
  userId: number = 0;
  currentDate: Date = new Date();
  message: string = '';
  hours: number = 0;
  minutes: number = 0;
  sec: number = 0;
  timer: any;

  constructor(
    private router: Router,
    private historyService: RegisterHistoryService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.userName = this.authService.getUser() || 'user'; // Obtén el nombre de usuario desde el servicio de autenticación
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.sec++;
      if (this.sec === 60) {
        this.sec = 0;
        this.minutes++;
      }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
    }, 1000);
  }

  async checkIn() {
    if (!this.timer) {
      this.startTimer();
    }

    const checkIn = new Date();
    try {
      await this.historyService.addTimestamps(this.userId, checkIn, null);
      this.message = 'Entrada registrada';
      setTimeout(() => (this.message = ''), 3000);
    } catch (error) {
      console.error('Error al registrar la entrada:', error);
      this.message = 'Error al registrar la entrada';
      setTimeout(() => (this.message = ''), 3000);
    }
  }

  async checkOut() {
    const checkOut = new Date();
    try {
      await this.historyService.addTimestamps(this.userId, null, checkOut);
      if (this.timer) {
        clearInterval(this.timer); // Asegúrate de limpiar el temporizador aquí si existe
        this.timer = null;
      }
      // Restablecer el temporizador a cero
      this.hours = 0;
      this.minutes = 0;
      this.sec = 0;
      this.message = 'Salida registrada';
      setTimeout(() => (this.message = ''), 3000);
    } catch (error) {
      console.error('Error al registrar la salida:', error);
      this.message = 'Error al registrar la salida';
      setTimeout(() => (this.message = ''), 3000);
    }
  }

  logOut() {
    if (this.timer) {
      clearInterval(this.timer); // Asegúrate de limpiar el temporizador al salir
      this.timer = null;
    }
    this.authService.logout(); // Asegúrate de llamar al método de cierre de sesión del servicio de autenticación
    this.router.navigate(['/login']);
  }
}
