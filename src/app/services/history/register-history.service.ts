import { Injectable } from '@angular/core';
import { DbsqlService } from '../database/dbsql.service';

interface Timestamp {
  id?: number;
  userId: number;
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterHistoryService {
  constructor(private dbService: DbsqlService) {}

  async addTimestamps(userId: number, checkIn: Date | null, checkOut: Date | null): Promise<void> {
    const currentDate = new Date();
    const timestamp: Timestamp = {
      userId: userId,
      date: currentDate,
      checkIn: checkIn,
      checkOut: checkOut
    };

    try {
      await this.dbService.addTimestamp(timestamp);
    } catch (error) {
      console.error('Error al guardar el timestamp en la base de datos:', error);
      throw error;
    }
  }

  async getHistory(userId: number): Promise<Timestamp[]> {
    try {
      return await this.dbService.getTimestamps(userId);
    } catch (error) {
      console.error('Error al obtener el historial desde la base de datos:', error);
      throw error;
    }
  }
}
