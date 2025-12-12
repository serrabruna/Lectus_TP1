import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, tap } from 'rxjs';
import { Pedido } from '../../../../model/pedido';

@Injectable({ providedIn: 'root' })
export class HistoricoService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://apilectus-production.up.railway.app'; 

  private _pedidos = signal<Pedido[]>([]);
  pedidos = this._pedidos.asReadonly(); 

  constructor() {
    this.carregarPedidos(); 
  }

  carregarPedidos() {
    this.http.get<Pedido[]>(`${this.apiUrl}/pedido`)
      .subscribe({
        next: (lista) => this._pedidos.set(lista),
        error: (err) => console.error('Erro ao carregar histórico', err)
      });
  }

  registrarPedido(pedido: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pedido`, pedido).pipe(
      tap(() => {
        this.carregarPedidos();
      })
    );
  }
  
  ultimoPedido = signal<Pedido | null>(null);
}