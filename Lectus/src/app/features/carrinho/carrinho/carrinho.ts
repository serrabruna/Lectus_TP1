import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho/carrinho.service';
import { Router, RouterModule } from '@angular/router';
import { Livro } from '../../../model/livro';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  private carrinhoService = inject(CarrinhoService);
  private router = inject(Router);

  livros = this.carrinhoService.itens;
  total = this.carrinhoService.valorTotal;
  qtdProd = this.carrinhoService.qtdItens;

  adicionar(livro: Livro) {
    this.carrinhoService.adicionar(livro, 1);
  }

  remover(id: number) {
    this.carrinhoService.remover(id);
  }

  atualizar(id: number, event: any) {
    const input = event.target as HTMLInputElement;
    const qtd = Number(input.value);
    if (!isNaN(qtd)) {
      this.carrinhoService.atualizarQtd(id, qtd);
    }
  }

  limpar() {
    this.carrinhoService.limpar();
  }

  checkout() {
    if (this.livros().length === 0) {
        alert("Seu carrinho está vazio");
        return;
    }
    
    this.router.navigate(['/checkout']);
  }

  continuarComprando() {
    this.router.navigate(['/catalogo']);
  }
  
  irCarrinho() { this.router.navigate(['/carrinho']); }
}
