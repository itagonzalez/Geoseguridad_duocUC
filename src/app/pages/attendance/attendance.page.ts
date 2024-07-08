// attendance.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterHistoryService } from '../../services/history/register-history.service';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { TimerService } from 'src/app/services/timer/timer.service'; 

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
    public timerService: TimerService 
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.userName = this.authService.getUser() || 'user';
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
  }

  async checkIn() {
    this.timerService.startTimer(); // Iniciar el temporizador al marcar entrada

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
      this.timerService.stopTimer(); // Detener el temporizador al marcar salida
      this.message = 'Salida registrada';
      setTimeout(() => (this.message = ''), 3000);
    } catch (error) {
      console.error('Error al registrar la salida:', error);
      this.message = 'Error al registrar la salida';
      setTimeout(() => (this.message = ''), 3000);
    }
  }

  logOut() {
    this.timerService.stopTimer(); // Detener el temporizador al salir
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
