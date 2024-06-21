import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 })),
      ]),
    ]),
  ],
})
  
export class LoginPage {
  formularioLogin: FormGroup;
  showSuccess: boolean = false;
  mostrarFormulario = true;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {
    this.formularioLogin = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8), Validators.pattern('^[a-zA-Z0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]]
    });
  }

  ingresar() {
    if (this.formularioLogin.valid) {
      const user = this.formularioLogin.get('user')?.value;
      const password = this.formularioLogin.get('password')?.value;

      // Mostrar el ticket verde
      this.showSuccess = true;

      // Transferir datos a la página Home
      this.navCtrl.navigateForward(['/perfil'], {
        queryParams: {
          user: user,
          password: password
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  registrar() {
    this.navCtrl.navigateForward(['/register']);
  }
}
