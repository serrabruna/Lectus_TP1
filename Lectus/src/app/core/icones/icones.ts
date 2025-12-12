
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../features/carrinho/services/carrinho/carrinho.service';

@Component({
  selector: 'app-icones',
  templateUrl: './icones.html',
  styleUrl: './icones.css',
})
export class Icones {
  private carrinho = inject(CarrinhoService);
  qtdCarrinho = this.carrinho.qtdItens;
}
