import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  formRegister: FormGroup;
  success: boolean = false;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {
    this.formRegister = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8), Validators.pattern('^[a-zA-Z0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      dateBirth: ['', Validators.required]
    });
  }

  register() {
    if (this.formRegister.valid) {
      const user = this.formRegister.get('user')?.value;
      const password = this.formRegister.get('password')?.value;
      const email = this.formRegister.get('email')?.value;

      // Guardar todos los datos del formulario en localStorage
      localStorage.setItem('user', user);
      localStorage.setItem('password', password);
      localStorage.setItem('email', email);

      // Guardar los demás campos en localStorage
      localStorage.setItem('address', this.formRegister.get('address')?.value);
      localStorage.setItem('name', this.formRegister.get('name')?.value);
      localStorage.setItem('lastName', this.formRegister.get('lastName')?.value);
      localStorage.setItem('companyName', this.formRegister.get('companyName')?.value);
      localStorage.setItem('dateBirth', this.formRegister.get('dateBirth')?.value);

      // Indicar que el registro fue exitoso
      this.success = true;

      // Redirigir al login después de un breve tiempo (simulado)
      setTimeout(() => {
        this.navCtrl.navigateBack(['/login']);
      }, 2000); // Redirige después de 2 segundos (2000 ms)
    } else {
      console.log('Formulario de registro inválido');
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
