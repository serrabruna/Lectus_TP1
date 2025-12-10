import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { HistoricoService } from '../../features/historico/services/historico/historico.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historico',
  imports: [CommonModule, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './historico.html',
  styleUrl: './historico.css',
})
export class Historico {
  private router = inject(Router);
  private historicoService = inject(HistoricoService);
  pedidos = this.historicoService.pedidos;
  irCarrinho() {
    this.router.navigate(['/carrinho']);
  }
  irHistorico() {
    this.router.navigate(['/historico']);
  }
}
