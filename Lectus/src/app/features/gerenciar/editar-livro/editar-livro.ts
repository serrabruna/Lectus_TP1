import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LivroService } from '../../catalogo/service/livro.service';
import { CategoriaService } from '../../categorias/service/categoria.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Livro } from '../../../model/livro';
import { Categoria } from '../../../model/categoria';

@Component({
  selector: 'app-editar-livro',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './editar-livro.html',
  styleUrl: './editar-livro.css',
})
export class EditarLivro {
  private router = inject(Router);
  private livroService = inject(LivroService);
  private categoriaService = inject(CategoriaService);

  livro = signal<Livro | null>(null);
  categorias: Signal<Categoria[]> = toSignal(this.categoriaService.listar(), { initialValue: [] });

  enviando = signal(false);
  mensagem = signal('');

  
}
