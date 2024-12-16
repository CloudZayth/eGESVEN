import { Component, OnInit } from '@angular/core';
import { CartService, Producto } from '../../services/cart.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: Producto[] = [];
  total: number = 0;
  diferenciaDespachoGratis: number = 20000;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCarrito().subscribe((productos) => {
      this.carrito = productos;
      this.calcularTotal(); // Calcular total cada vez que el carrito cambie
    });
  }

  calcularTotal() {
    this.total = this.carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    this.diferenciaDespachoGratis = Math.max(20000 - this.total, 0); // Calcular cuánto falta para despacho gratis
  }

  incrementarCantidad(id: number) {
    const producto = this.carrito.find((p) => p.id === id);
    if (producto) {
      const nuevaCantidad = producto.cantidad + 1;
      this.cartService.actualizarCantidad(id, nuevaCantidad);
      this.calcularTotal(); // Recalcular el total
    }
  }

  decrementarCantidad(id: number) {
    const producto = this.carrito.find((p) => p.id === id);
    if (producto && producto.cantidad > 1) {
      const nuevaCantidad = producto.cantidad - 1;
      this.cartService.actualizarCantidad(id, nuevaCantidad);
      this.calcularTotal(); // Recalcular el total
    } else if (producto) {
      this.cartService.eliminarProducto(id);
      this.calcularTotal(); // Recalcular el total
    }
  }

  vaciarCarrito() {
    this.cartService.vaciarCarrito();
    this.calcularTotal(); // Recalcular el total
  }

  irAPagar() {
    console.log('Redirigiendo al proceso de pago...');
  }
}





