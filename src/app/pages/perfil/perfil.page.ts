import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../services/data/user-data.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  formularioPerfil: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService
  ) {
    this.formularioPerfil = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombreEmpresa: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Cargar los datos del usuario existente si hay
    const userData = this.userDataService.obtenerDatosUsuario();
    if (userData) {
      this.formularioPerfil.patchValue(userData);
    }
  }

  guardarCambios() {
    if (this.formularioPerfil.valid) {
      // Guardar los cambios en el servicio UserDataService
      this.userDataService.guardarDatosUsuario(this.formularioPerfil.value);
      console.log('Datos actualizados:', this.formularioPerfil.value);
    } else {
      console.error('Formulario inválido');
    }
  }

  cancelar() {
    console.log('Edición cancelada');
    // Implementa la lógica para cancelar la edición según sea necesario
  }
}
