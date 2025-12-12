import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho/carrinho.service';
import { Router, RouterModule } from '@angular/router';
import { Livro } from '../../../model/livro';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, RouterModule, FormsModule],
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

  atualizar(id: number, novaQtd: number) {
    if (!isNaN(novaQtd) && novaQtd > 0) {
        this.carrinhoService.atualizarQtd(id, novaQtd);
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
