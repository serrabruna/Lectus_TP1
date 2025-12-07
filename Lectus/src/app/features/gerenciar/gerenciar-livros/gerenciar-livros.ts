import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-gerenciar-livros',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './gerenciar-livros.html',
  styleUrl: './gerenciar-livros.css',
})
export class GerenciarLivros {

}
