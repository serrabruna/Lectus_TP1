import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho/carrinho.service';
import { Router, RouterModule } from '@angular/router';
import { HistoricoService } from '../../historico/services/historico/historico.service';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  private carrinho = inject(CarrinhoService);
  private router = inject(Router);
  private historicoService = inject(HistoricoService);

  livros = this.carrinho.itens;
  total = this.carrinho.valorTotal;
  qtdProd = this.carrinho.qtdItens;

  remover(id: number) {
    this.carrinho.remover(id);
  }
  atualizar(id: number, event: any) {
    const input = event.target as HTMLInputElement;
    const qtd = Number(input.value);
    if (!isNaN(qtd)) {
      this.carrinho.atualizarQtd(id, qtd);
    }
  }
  limpar() {
    this.carrinho.limpar();
  }
  checkout() {
    // const pedido = {
    //   id: Date.now(),
    //   data: new Date(),
    //   itens: this.livros(),
    //   total: this.total()
    // };

    // this.historicoService.registrarPedido(pedido);

    // alert(`Simulando checkout. Total: R$ ${this.total().toFixed(2)}`);
    this.router.navigate(['/checkout']);

  }
  continuarComprando() {
    this.router.navigate(['/catalogo']);
  }
  irCarrinho() {
    this.router.navigate(['/carrinho']);
  }
  irHistorico() {
    this.router.navigate(['/historico']);
  }

}
