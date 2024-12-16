import { Component } from '@angular/core';
import { CartService, Producto } from '../../services/cart.service';

@Component({
  selector: 'app-lays-merken',
  templateUrl: './lays-merken.page.html',
  styleUrls: ['./lays-merken.page.scss'],
})
export class LaysMerkenPage {

  constructor(private cartService: CartService) {}
  
    agregarAlCarrito() {
      const producto: Producto = {
        id: 2,
        nombre: "Lay's Merken",
        descripcion: "Papas Fritas Lay's Merkén 180 g",
        precio: 1790,
        cantidad: 1,
        imagen: 'assets/lays_merken.webp',
      };
    
      this.cartService.agregarProducto(producto);
    }

}
