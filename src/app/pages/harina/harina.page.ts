import { Component } from '@angular/core';
import { CartService, Producto } from '../../services/cart.service';

@Component({
  selector: 'app-harina',
  templateUrl: './harina.page.html',
  styleUrls: ['./harina.page.scss'],
})
export class HarinaPage {
  
  constructor(private cartService: CartService) {}

  agregarAlCarrito() {
    const producto: Producto = {
      id: 1,
      nombre: 'Harina Selecta',
      descripcion: 'Harina sin polvos de hornear',
      precio: 1590,
      cantidad: 1,
      imagen: 'assets/harina.webp',
    };
  
    this.cartService.agregarProducto(producto);
  }
  
}

