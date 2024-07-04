import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

interface User {
  id?: number;
  user: string;
  password: string;
  email: string;
  address: string;
  name: string;
  lastName: string;
  companyName: string;
  dateBirth: string;
}

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
export class DbsqlService {
  private database!: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initializeDatabase();
    });
  }

  async initializeDatabase() {
    try {
      this.database = await this.sqlite.create({
        name: 'my_database.db',
        location: 'default'
      });

      // Crear la tabla de usuarios
      await this.database.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          email TEXT NOT NULL,
          address TEXT,
          name TEXT,
          lastName TEXT,
          companyName TEXT,
          dateBirth TEXT
        );
      `, []);

      // Crear la tabla de timestamps
      await this.database.executeSql(`
        CREATE TABLE IF NOT EXISTS timestamps (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          date TEXT NOT NULL,
          checkIn TEXT,
          checkOut TEXT,
          FOREIGN KEY (userId) REFERENCES users(id)
        );
      `, []);
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async addUser(user: User): Promise<void> {
    const { user: username, password, email, address, name, lastName, companyName, dateBirth } = user;
    try {
      await this.database.executeSql('INSERT INTO users (user, password, email, address, name, lastName, companyName, dateBirth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
        username, password, email, address, name, lastName, companyName, dateBirth
      ]);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  async getUser(username: string): Promise<User | null> {
    try {
      const result = await this.database.executeSql('SELECT * FROM users WHERE user = ?', [username]);
      if (result.rows.length > 0) {
        const item = result.rows.item(0);
        return {
          id: item.id,
          user: item.user,
          password: item.password,
          email: item.email,
          address: item.address,
          name: item.name,
          lastName: item.lastName,
          companyName: item.companyName,
          dateBirth: item.dateBirth
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async addTimestamp(timestamp: Timestamp): Promise<void> {
    const { userId, date, checkIn, checkOut } = timestamp;
    try {
      await this.database.executeSql('INSERT INTO timestamps (userId, date, checkIn, checkOut) VALUES (?, ?, ?, ?)', [
        userId, date.toISOString(), checkIn ? checkIn.toISOString() : null, checkOut ? checkOut.toISOString() : null
      ]);
    } catch (error) {
      console.error('Error adding timestamp:', error);
      throw error;
    }
  }

  async getTimestamps(userId: number): Promise<Timestamp[]> {
    try {
      const result = await this.database.executeSql('SELECT * FROM timestamps WHERE userId = ?', [userId]);
      const timestamps: Timestamp[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        const item = result.rows.item(i);
        timestamps.push({
          id: item.id,
          userId: item.userId,
          date: new Date(item.date),
          checkIn: item.checkIn ? new Date(item.checkIn) : null,
          checkOut: item.checkOut ? new Date(item.checkOut) : null
        });
      }
      return timestamps;
    } catch (error) {
      console.error('Error getting timestamps:', error);
      throw error;
    }
  }

  async updateUser(user: User): Promise<void> {
    const { id, user: username, password, email, address, name, lastName, companyName, dateBirth } = user;
    try {
      await this.database.executeSql(
        'UPDATE users SET user = ?, password = ?, email = ?, address = ?, name = ?, lastName = ?, companyName = ?, dateBirth = ? WHERE id = ?',
        [username, password, email, address, name, lastName, companyName, dateBirth, id]
      );
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
