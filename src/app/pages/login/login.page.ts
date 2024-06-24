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
  loginError: boolean = false;
  loginSuccess: boolean = false; 
  isLoading: boolean = false; 

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

  async iniciarSesion() {
    const user = this.formularioLogin.get('user')?.value;
    const password = this.formularioLogin.get('password')?.value;

    this.isLoading = true; 

    setTimeout(() => {
      // Verificar las credenciales usando AuthService
      const loggedIn = this.authService.login(user, password);

      this.isLoading = false; 

      if (loggedIn) {
        this.loginSuccess = true; // Mostrar mensaje de éxito
        setTimeout(() => {
          this.navCtrl.navigateForward('/asistencia');
        }, 1000); 
      } else {
        this.loginError = true; 
        this.loginSuccess = false; 
        console.log('Credenciales inválidas');
      }
    }, 2000); 
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/register'); 
  }
}
