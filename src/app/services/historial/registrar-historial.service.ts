import { Injectable } from '@angular/core';

interface Marca {
  fecha: Date;
  entrada: Date | null;
  salida: Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrarHistorialService {
  private historialMarcas: Marca[] = [];

  constructor() { }

  agregarMarca(entrada: Date | null, salida: Date | null) {
    const fechaActual = new Date();
    this.historialMarcas.push({ fecha: fechaActual, entrada, salida });
  }

  obtenerHistorial(): Marca[] {
    return this.historialMarcas;
  }
}
