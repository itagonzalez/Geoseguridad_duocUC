import { Injectable } from '@angular/core';
import { DbsqlService } from '../database/dbsql.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dbService: DbsqlService) { }

  async login(user: string, password: string): Promise<boolean> {
    try {
      // Obtener el usuario desde la base de datos
      const userData = await this.dbService.getUser(user);

      // Verificar las credenciales
      if (userData && userData.password === password) {
        localStorage.setItem('user', userData.user);
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Verifica si el usuario está autenticado
  }
}
