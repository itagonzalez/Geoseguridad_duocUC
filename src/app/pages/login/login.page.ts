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
  formLogin: FormGroup;
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
    this.formLogin = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async logIn() {
    const user = this.formLogin.get('user')?.value;
    const password = this.formLogin.get('password')?.value;

    this.isLoading = true; 

    try {
      const loggedIn = await this.authService.login(user, password);

      this.isLoading = false;

      if (loggedIn) {
        this.loginSuccess = true; // Mostrar mensaje de éxito
        setTimeout(() => {
          this.navCtrl.navigateForward('/attendance');
        }, 1000); 
      } else {
        this.loginError = true; 
        this.loginSuccess = false; 
        console.log('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.isLoading = false;
      this.loginError = true;
      this.loginSuccess = false;
    }
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/register'); 
  }
}
