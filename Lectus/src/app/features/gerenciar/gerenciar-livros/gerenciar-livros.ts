import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Icones } from "../../../core/icones/icones";

@Component({
  selector: 'app-gerenciar-livros',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, Icones],
  templateUrl: './gerenciar-livros.html',
  styleUrl: './gerenciar-livros.css',
})
export class GerenciarLivros {

}
