import { Injectable, signal } from '@angular/core';
import { Pedido } from '../../../../model/pedido';
import { ItemPedido } from '../../../../model/item-pedido';

const CHAVE = 'lojatp1_historico';

@Injectable({ providedIn: 'root' })
export class HistoricoService {

  private _ultimoPedido = signal<Pedido | null>(null);
  ultimoPedido = this._ultimoPedido;

  private _pedidos = signal<Pedido[]>(this.carregar());

  pedidos = this._pedidos;

  private carregar(): Pedido[] {
    const data = localStorage.getItem(CHAVE);
    return data ? JSON.parse(data) : [];
  }

 registrarPedido(pedido: Pedido) {
  const lista = [...this._pedidos(), pedido];
  this._pedidos.set(lista);
  this._ultimoPedido.set(pedido);

  localStorage.setItem(CHAVE, JSON.stringify(lista));
}


}