import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  ap_paterno: string = '';
  ap_materno: string = '';
  usuario: string = '';
  password: string = '';
  email: string = '';

  isDBReady: boolean = false;

  constructor(private router: Router,
    private activateroute: ActivatedRoute,
    private alertController: AlertController,
    private dbService: DbserviceService,) { }

  ngOnInit() {
    this.dbService.getIsDBReady().subscribe(isReady => {
      this.isDBReady = isReady;
      if (isReady) {
        
      }
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  guardar() {
    if (this.nombre.trim() === '' || this.ap_paterno.trim() === '' || this.ap_materno.trim() === '') {
      this.presentAlert('Error: nombre y apellidos vacíos');
    } else {
      this.guardarDatos();
    }
  }

  guardarDatos() {
    const cliente = {
      nombre: this.nombre,
      ap_paterno: this.ap_paterno,
      ap_materno: this.ap_materno,
      usuario: this.usuario,
      password: this.password,
      email: this.email
    };
  
    this.dbService.insertCliente(cliente)
      .then(() => {
        this.presentAlert('Datos guardados exitosamente');
        this.router.navigate(['/login']);
      })
      .catch((error: any) => {
        this.presentAlert('Error al guardar datos: ' + (error.message || error));
      });
  }
  

  volver() {
    this.router.navigate(['/login']);
  }

}
