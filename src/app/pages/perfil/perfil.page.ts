import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any = {};
  modoEdicion: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener los datos del usuario almacenados en localStorage
    this.usuario = {
      user: localStorage.getItem('user'),
      password: localStorage.getItem('password'),
      email: localStorage.getItem('email'),
      direccion: localStorage.getItem('direccion'),
      nombre: localStorage.getItem('nombre'),
      apellidos: localStorage.getItem('apellidos'),
      nombreEmpresa: localStorage.getItem('nombreEmpresa'),
      fechaNacimiento: localStorage.getItem('fechaNacimiento')
    };
  }

  habilitarEdicion() {
    // Habilitar el modo de edición
    this.modoEdicion = true;
  }

  guardarCambios() {
    // Guardar los cambios en localStorage
    localStorage.setItem('user', this.usuario.user);
    localStorage.setItem('password', this.usuario.password);
    localStorage.setItem('email', this.usuario.email);
    localStorage.setItem('direccion', this.usuario.direccion);
    localStorage.setItem('nombre', this.usuario.nombre);
    localStorage.setItem('apellidos', this.usuario.apellidos);
    localStorage.setItem('nombreEmpresa', this.usuario.nombreEmpresa);
    localStorage.setItem('fechaNacimiento', this.usuario.fechaNacimiento);

    // Deshabilitar el modo de edición
    this.modoEdicion = false;

    // Mostrar un mensaje o realizar alguna acción adicional si es necesario
    console.log('Cambios guardados correctamente.');
  }

  cerrarSesion() {
    // Eliminar todos los datos de usuario del localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    localStorage.removeItem('direccion');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellidos');
    localStorage.removeItem('nombreEmpresa');
    localStorage.removeItem('fechaNacimiento');

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
