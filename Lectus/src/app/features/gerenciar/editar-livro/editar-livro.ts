import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar-livro',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './editar-livro.html',
  styleUrl: './editar-livro.css',
})
export class EditarLivro {
  
}
