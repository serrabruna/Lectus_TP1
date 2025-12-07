
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../features/carrinho/services/carrinho/carrinho.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icones',
  imports: [MatIconModule, RouterLink],
  templateUrl: './icones.html',
  styleUrl: './icones.css',
})
export class Icones {

  tituloLoja = input.required<string>();
  private carrinho = inject(CarrinhoService);
  qtdCarrinho = this.carrinho.qtdItens;
}
