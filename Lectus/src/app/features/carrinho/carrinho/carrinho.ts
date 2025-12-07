import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho/carrinho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  private carrinho = inject(CarrinhoService);
  private router = inject(Router);

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
    alert(`Simulando checkout. Total: R$ ${this.total().toFixed(2)}`);
    this.limpar();
    this.router.navigate(['/livros']);
  }
  continuarComprando() {
    this.router.navigate(['/catalogo']);
  }
  
}
