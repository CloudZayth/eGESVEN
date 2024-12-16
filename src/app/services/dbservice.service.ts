import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

// Definición de tipos para mayor seguridad y legibilidad
export interface Cliente {
  id_cliente?: number;
  usuario: string;
  password: string;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  email: string;
}

export interface Administrador {
  id_admin?: number;
  usuario: string;
  cod_credencial: string;
  password: string;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  email: string;
}

const CREATE_CLIENTE_TABLE = `
  CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT,
    password TEXT,
    nombre TEXT,
    ap_paterno TEXT,
    ap_materno TEXT,
    email TEXT
  );
`;

const CREATE_ADMINISTRADOR_TABLE = `
  CREATE TABLE IF NOT EXISTS administrador (
    id_admin INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT,
    cod_credencial TEXT,
    password TEXT,
    nombre TEXT,
    ap_paterno TEXT,
    ap_materno TEXT,
    email TEXT
  );
`;

@Injectable({
  providedIn: 'root',
})
export class DbserviceService {
  private db!: SQLiteObject;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private isDBReady = new BehaviorSubject<boolean>(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.initDatabase();
  }

  // Inicializa la base de datos y crea las tablas
  async initDatabase(): Promise<void> {
    try {
      this.db = await this.sqlite.create({
        name: 'grhdb.db',
        location: 'default',
      });

      await this.createTables();
      await this.addMissingColumns();

      this.isDBReady.next(true);
      this.presentToast('Base de datos y tablas creadas con éxito');
    } catch (error) {
      this.handleError(error, 'Error al inicializar la base de datos');
    }
  }

  // Crea las tablas iniciales
  private async createTables(): Promise<void> {
    try {
      await this.db.transaction(async (tx) => {
        tx.executeSql(CREATE_CLIENTE_TABLE, []);
        tx.executeSql(CREATE_ADMINISTRADOR_TABLE, []);
      });
      this.presentToast('Tablas creadas con éxito');
    } catch (error) {
      this.handleError(error, 'Error al crear las tablas');
    }
  }

  // Verificar y añadir columnas faltantes
  private async addMissingColumns(): Promise<void> {
    try {
      const res = await this.db.executeSql(`PRAGMA table_info(administrador)`, []);
      const columns = Array.from({ length: res.rows.length }, (_, i) => res.rows.item(i).name);

      if (!columns.includes('cod_credencial')) {
        await this.db.executeSql(`ALTER TABLE administrador ADD COLUMN cod_credencial TEXT`, []);
        this.presentToast('Columna cod_credencial añadida exitosamente');
      }
    } catch (error) {
      this.handleError(error, 'Error al verificar/crear columnas');
    }
  }

  // Validar cliente con credenciales
  async validarCliente(usuario: string, password: string): Promise<Cliente | null> {
    try {
      const res = await this.db.executeSql(
        'SELECT * FROM cliente WHERE usuario = ? AND password = ?',
        [usuario, password]
      );

      if (res.rows.length > 0) {
        this.isAuthenticated.next(true);
        return res.rows.item(0) as Cliente;
      } else {
        this.isAuthenticated.next(false);
        return null;
      }
    } catch (error) {
      this.handleError(error, 'Error al validar cliente');
      return null;
    }
  }

  // Validar administrador con credenciales
  async validarAdmin(usuario: string, cod_credencial: string): Promise<Administrador | null> {
    try {
      const res = await this.db.executeSql(
        'SELECT * FROM administrador WHERE usuario = ? AND cod_credencial = ?',
        [usuario, cod_credencial]
      );

      if (res.rows.length > 0) {
        this.isAuthenticated.next(true);
        return res.rows.item(0) as Administrador;
      } else {
        this.isAuthenticated.next(false);
        return null;
      }
    } catch (error) {
      this.handleError(error, 'Error al validar admin');
      return null;
    }
  }

  // Insertar cliente
  async insertCliente(cliente: Cliente): Promise<void> {
    try {
      const { nombre, ap_paterno, ap_materno, usuario, password, email } = cliente;
      await this.db.executeSql(
        `INSERT INTO cliente (nombre, ap_paterno, ap_materno, usuario, password, email) VALUES (?, ?, ?, ?, ?, ?);`,
        [nombre, ap_paterno, ap_materno, usuario, password, email]
      );
      this.presentToast('Cliente insertado correctamente');
    } catch (error) {
      this.handleError(error, 'Error al insertar cliente');
    }
  }

  // Insertar administrador
  async insertAdmin(admin: Administrador): Promise<void> {
    try {
      const { nombre, ap_paterno, ap_materno, usuario, cod_credencial, password, email } = admin;
      await this.db.executeSql(
        `INSERT INTO administrador (nombre, ap_paterno, ap_materno, usuario, cod_credencial, password, email) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [nombre, ap_paterno, ap_materno, usuario, cod_credencial, password, email]
      );
      this.presentToast('Administrador insertado correctamente');
    } catch (error) {
      this.handleError(error, 'Error al insertar administrador');
    }
  }

  // Mostrar notificación toast
  private async presentToast(message: string, duration: number = 2000, color: string = 'primary'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
    });
    await toast.present();
  }

  // Manejar errores de forma centralizada
  private handleError(error: any, message: string): void {
    console.error(message, error);
    this.presentToast(`${message}: ${error.message || JSON.stringify(error)}`);
  }

  // Observables para verificar estados
  getIsDBReady() {
    return this.isDBReady.asObservable();
  }

  isLoggedIn() {
    return this.isAuthenticated.asObservable();
  }

  // Cerrar sesión
  logout() {
    this.isAuthenticated.next(false);
  }
}

