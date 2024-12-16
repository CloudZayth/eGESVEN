import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  usuario: string = "";
  password: string = ""; 

  constructor(private alertController: AlertController,
    private router: Router,
    private dbService: DbserviceService) { }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async login() {
    const user = await this.dbService.validarCliente(this.usuario, this.password);
    if (user) {
      let navigationExtras: NavigationExtras = {
        state: {
          usuarioEnviado: this.usuario,
          passwordEnviado: this.password
        }
      }
      this.router.navigate(['/inicio'], navigationExtras);
    } else {
      this.presentAlert('Los datos ingresados no son válidos, por favor inténtelo nuevamente');
    }
  }

  crear_cuenta() {
    this.router.navigate(['/registro-cliente']);
  }

}
