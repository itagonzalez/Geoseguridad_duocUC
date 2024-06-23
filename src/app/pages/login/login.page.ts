import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formularioLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    // Inicializa el formulario en el constructor
    this.formularioLogin = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  iniciarSesion() {
    const user = this.formularioLogin.get('user')?.value;
    const password = this.formularioLogin.get('password')?.value;

    // Verificar las credenciales usando AuthService
    const loggedIn = this.authService.login(user, password);

    if (loggedIn) {
      // Redirigir a la página de asistencia si el inicio de sesión es exitoso
      this.navCtrl.navigateForward('/asistencia');
    } else {
      console.log('Credenciales inválidas');
      // Puedes manejar el caso de credenciales inválidas aquí
    }
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/register'); // Ajusta la ruta según tu estructura
  }
}


