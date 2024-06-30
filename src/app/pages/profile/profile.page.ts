import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};
  editMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener los datos del usuario almacenados en localStorage
    this.user = {
      user: localStorage.getItem('user'),
      password: localStorage.getItem('password'),
      email: localStorage.getItem('email'),
      address: localStorage.getItem('address'),
      name: localStorage.getItem('name'),
      lastName: localStorage.getItem('lastName'),
      companyName: localStorage.getItem('companyName'),
      dateBirth: localStorage.getItem('dateBirth')
    };
  }

  enableEdit() {
    // Habilitar el modo de edición
    this.editMode = true;
  }

  saveChanges() {
    // Guardar los cambios en localStorage
    localStorage.setItem('user', this.user.user);
    localStorage.setItem('password', this.user.password);
    localStorage.setItem('email', this.user.email);
    localStorage.setItem('address', this.user.address);
    localStorage.setItem('name', this.user.name);
    localStorage.setItem('lastName', this.user.lastName);
    localStorage.setItem('companyName', this.user.companyName);
    localStorage.setItem('dateBirth', this.user.dateBirth);

    // Deshabilitar el modo de edición
    this.editMode = false;

    // Mostrar un mensaje o realizar alguna acción adicional si es necesario
    console.log('Cambios guardados correctamente.');
  }

  logOut() {
    // Eliminar todos los datos de usuario del localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    localStorage.removeItem('address');
    localStorage.removeItem('name');
    localStorage.removeItem('lastName');
    localStorage.removeItem('companyName');
    localStorage.removeItem('dateBirth');

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
