import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Método para verificar las credenciales del usuario
  login(user: string, password: string): boolean {
    // Obtener los datos almacenados en localStorage
    const storedUser = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');

    // Verificar las credenciales con los datos almacenados
    if (user === storedUser && password === storedPassword) {
      // Simulamos un inicio de sesión exitoso
      return true;
    } else {
      return false;
    }
  }
}