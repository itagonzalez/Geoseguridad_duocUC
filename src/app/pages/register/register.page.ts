import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  formularioRegister: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {
    this.formularioRegister = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8), Validators.pattern('^[a-zA-Z0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  registrar() {
    if (this.formularioRegister.valid) {
      const user = this.formularioRegister.get('user')?.value;
      const password = this.formularioRegister.get('password')?.value;
      const email = this.formularioRegister.get('email')?.value;

      // Guardar usuario en alguna base de datos o servicio
      console.log('Usuario registrado:', { user, email });

      // Redirigir al login
      this.navCtrl.navigateBack(['/login']);
    } else {
      console.log('Formulario de registro inválido');
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
