import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HistoricoService } from '../historico/services/historico/historico.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-resumo-pedido',
  imports: [CommonModule, DatePipe],
  standalone: true,
  templateUrl: './resumo-pedido.html',
  styleUrl: './resumo-pedido.css',
})export class ResumoPedido {
  nomeUsuario = '';
  pedido: any;

  private historico = inject(HistoricoService);
  private router = inject(Router);

  constructor() {
    const nav = history.state;

    // nome só vem do checkout
    this.nomeUsuario = nav?.nomeUsuario ?? 'Cliente';

    // prioridade: navigation state
    this.pedido = nav?.pedido;

    // fallback: último pedido salvo
    if (!this.pedido) {
      this.pedido = this.historico.ultimoPedido();
    }
  }

  voltarCatalogo() {
    this.router.navigate(['/catalogo']);
  }
}
