import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1s ease-in-out')
      ]),
      transition(':leave', [
        animate('1s ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class PerfilPage implements OnInit {
  formularioPerfil: FormGroup;
  user: string = '';
  showAlert: boolean = false;
  mostrarCalendario: boolean = false;
  animState: string = 'in';

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertController: AlertController
    ) {
    this.formularioPerfil = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      nombreEmpresa: [''],
      fechaNacimiento: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user = params['user'];
    });
  }

  limpiar() {
    setTimeout(() => {
      this.formularioPerfil.reset();
    }, 1000); // Tiempo de la animación
  }

  async mostrar() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Nombre de Usuario: ${this.formularioPerfil.get('nombreUsuario')?.value}<br>
                Contraseña: ${this.formularioPerfil.get('contrasena')?.value}<br>
                Correo: ${this.formularioPerfil.get('correo')?.value}<br>
                Empresa: ${this.formularioPerfil.get('nombreEmpresa')?.value}<br>
                Fecha de Nacimiento: ${this.formularioPerfil.get('fechaNacimiento')?.value}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  cerrarSesion() {
    this.navCtrl.navigateRoot('/login'); 
  }

  toggleCalendario() {
    this.mostrarCalendario = !this.mostrarCalendario;
  }

  async confirmarCerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Está seguro de cerrar la sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No confirmado');
          }
        }, {
          text: 'Sí',
          handler: () => {
            console.log('Sí confirmado');
            this.navCtrl.navigateRoot('/login'); 
          }
        }
      ]
    });

    await alert.present();
  }
}
