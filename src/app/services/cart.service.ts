import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private carrito: Producto[] = [];
  private carrito$ = new BehaviorSubject<Producto[]>([]);

  constructor() {}

  // Obtener el carrito como Observable
  getCarrito() {
    return this.carrito$.asObservable();
  }

  // Agregar un producto al carrito (solo si no existe)
  agregarProducto(producto: Producto) {
    const productoExistente = this.carrito.find((p) => p.id === producto.id);

    if (productoExistente) {
      // Si ya existe, no hacemos nada en este método
      return;
    }

    this.carrito.push(producto); // Agregar nuevo producto
    this.carrito$.next(this.carrito); // Actualizar el carrito
  }

  // Actualizar la cantidad de un producto existente
  actualizarCantidad(id: number, nuevaCantidad: number) {
    const producto = this.carrito.find((p) => p.id === id);
    if (producto) {
      producto.cantidad = nuevaCantidad; // Actualizar cantidad
    }
    this.carrito$.next(this.carrito); // Notificar los cambios
  }

  // Eliminar un producto del carrito
  eliminarProducto(id: number) {
    this.carrito = this.carrito.filter((producto) => producto.id !== id);
    this.carrito$.next(this.carrito);
  }

  // Vaciar el carrito
  vaciarCarrito() {
    this.carrito = [];
    this.carrito$.next(this.carrito);
  }
}



