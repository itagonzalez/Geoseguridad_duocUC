import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterHistoryService } from '../../services/history/register-history.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  userName: string = '';
  currentDate: Date = new Date();
  message: string = '';
  hours: number = 0;
  minutes: number = 0;
  sec: number = 0;
  timer: any;

  constructor(private router: Router, private historyService: RegisterHistoryService) {}

  ngOnInit() {
    this.userName = localStorage.getItem('user') || 'user';
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

  checkIn() {
    // Inicia el cronómetro al marcar entrada si no está iniciado
    if (!this.timer) {
      this.startTimer();
    }

    const checkIn = new Date();
    this.historyService.addTimestamps(checkIn, null);
    this.message = 'Entrada registrada';
    setTimeout(() => (this.message = ''), 3000);
  }

  checkOut() {
    const checkOut = new Date();
    this.historyService.addTimestamps(null, checkOut);
    clearInterval(this.timer);
    this.timer = null; 
    this.message = 'Salida registrada';
    setTimeout(() => (this.message = ''), 3000);
  }

  logOut() {    
    this.router.navigate(['/login']);
  }
}
