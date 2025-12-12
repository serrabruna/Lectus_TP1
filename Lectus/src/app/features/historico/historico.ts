import { Component, inject, signal } from '@angular/core';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { HistoricoService } from '../../features/historico/services/historico/historico.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Pedido } from '../../model/pedido';

@Component({
  selector: 'app-historico',
  imports: [CommonModule, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './historico.html',
  styleUrl: './historico.css',
})
export class Historico {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://apilectus-production.up.railway.app'; 

  private _pedidos = signal<Pedido[]>([]);
  pedidos = this._pedidos.asReadonly();

  constructor() {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.http.get<Pedido[]>(`${this.apiUrl}/pedidos`)
      .subscribe({
        next: (lista) => this._pedidos.set(lista),
        error: (err) => console.error('Erro ao carregar histórico', err)
      });
  }

  registrarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/pedido`, pedido).pipe(
      tap(() => {
        // Após criar, recarrega a lista para atualizar o histórico
        this.carregarPedidos(); 
      })
    );
  }
  
  ultimoPedido = signal<Pedido | null>(null);
}
