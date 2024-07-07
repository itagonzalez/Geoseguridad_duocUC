// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  async login(user: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/auth/login`, { user, password }).toPromise();
      if (response && response.success) {
        localStorage.setItem('token', response.token); // Almacena el token JWT
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica si el usuario está autenticado
  }
}
