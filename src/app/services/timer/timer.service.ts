// timer.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer: any;
  private hours: number = 0;
  private minutes: number = 0;
  private sec: number = 0;

  constructor() {}

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

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
    this.hours = 0;
    this.minutes = 0;
    this.sec = 0;
  }

  getHours() {
    return this.hours;
  }

  getMinutes() {
    return this.minutes;
  }

  getSeconds() {
    return this.sec;
  }
}
