import { Component, OnInit } from '@angular/core';
import { RegistrarHistorialService } from '../../services/historial/registrar-historial.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historialMarcas: any[] = [];
  nombreUsuario: string = '';

  constructor(private router: Router, private historialService: RegistrarHistorialService) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('user') || 'Usuario';
    this.historialMarcas = this.historialService.obtenerHistorial();
  }

  cerrarSesion() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
