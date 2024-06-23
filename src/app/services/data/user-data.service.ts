import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private localStorageKey = 'userData'; 

  constructor() {}

  // Método para guardar los datos del usuario en localStorage
  guardarDatosUsuario(data: any) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  // Método para obtener los datos del usuario desde localStorage
  obtenerDatosUsuario(): any {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  // Método para eliminar los datos del usuario de localStorage
  eliminarDatosUsuario() {
    localStorage.removeItem(this.localStorageKey);
  }
}
