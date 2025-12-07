import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../features/carrinho/services/carrinho/carrinho.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  
}
