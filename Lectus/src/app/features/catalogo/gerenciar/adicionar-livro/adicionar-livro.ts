import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../service/livro.service';

@Component({
  selector: 'app-adicionar-livro',
  imports: [FormsModule, CommonModule],
  templateUrl: './adicionar-livro.html',
  styleUrl: './adicionar-livro.css',
})
export class AdicionarLivro {
  private router = inject(Router);
  private livroService = inject(LivroService);

  enviando = signal(false);
  mensagem = signal('');

}
