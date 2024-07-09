import { Injectable } from '@angular/core';
import { DbsqlService } from '../database/dbsql.service';

export interface Timestamp {
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
      await this.dbService.addTimestamp(userId, timestamp).toPromise();
    } catch (error) {
      console.error('Error al guardar el timestamp en la base de datos:', error);
      throw error;
    }
  }

  async getHistory(userId: number): Promise<Timestamp[]> {
    try {
      const history: Timestamp[] = await this.dbService.getTimestamps(userId).toPromise();
      // Ordenar por fecha descendente
      history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return history.map((timestamp: any) => ({
        ...timestamp,
        date: new Date(timestamp.checkIn || timestamp.checkOut || timestamp.date),
        checkIn: timestamp.checkIn ? new Date(timestamp.checkIn) : null,
        checkOut: timestamp.checkOut ? new Date(timestamp.checkOut) : null
      }));
    } catch (error) {
      console.error('Error al obtener el historial desde la base de datos:', error);
      throw error;
    }
  }
  
}
