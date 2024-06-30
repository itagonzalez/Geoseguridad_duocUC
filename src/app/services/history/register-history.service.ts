import { Injectable } from '@angular/core';

interface Timestamps {
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterHistoryService {
  private historyTimestamps: Timestamps[] = [];

  constructor() { }

  addTimestamps(checkIn: Date | null, checkOut: Date | null) {
    const currentDate = new Date();
    this.historyTimestamps.push({ date: currentDate, checkIn, checkOut });
  }

  getHistory(): Timestamps[] {
    return this.historyTimestamps;
  }
}
