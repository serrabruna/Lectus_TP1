import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../service/livro.service';
import { Livro } from '../../../../model/livro';
import { CategoriaService } from '../../../categorias/service/categoria.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Categoria } from '../../../../model/categoria';

@Component({
  selector: 'app-adicionar-livro',
  imports: [FormsModule, CommonModule],
  templateUrl: './adicionar-livro.html',
  styleUrl: './adicionar-livro.css',
})
export class AdicionarLivro {
  private router = inject(Router);
  private livroService = inject(LivroService);
  private categoriaService = inject(CategoriaService);

  enviando = signal(false);
  mensagem = signal('');

  categorias: Signal<Categoria[]> = toSignal(this.categoriaService.listar(), { initialValue: [] });

  novoLivro: Livro = {
    id: 0, 
    categoria_id: 1,
    titulo: '',
    autor: '',
    isbn: '',
    preco: 0,
    estoque: 1, 
    sinopse: '',
    editora: '',
    imageURL: '',
    data_publicacao: new Date(),
    empromocao: false, 
  };

  onSubmit(form: NgForm){
    if(form.invalid){
      this.mensagem.set('Preencha todos os campos obrigatórios.');
      return;
    }

    this.enviando.set(true);
    this.mensagem.set('Adicionando Livro...');

    this.livroService.adicionarLivro(this.novoLivro).subscribe({
      next: (res) => {
        this.mensagem.set(`Livro "${res.titulo}" adicionado com sucesso!`);

        form.resetForm;
      },
      error: err => {
        console.error('Erro ao adicionar livro: ' + err);
        this.mensagem.set(`Erro ao adicionar livro: ${err.message}.`);
        this.enviando.set(false);
      },
      complete: () => {
        this.enviando.set(false);
      }
    })
  }

  onDataPublicacaoChange(dateString: string) {
    this.novoLivro.data_publicacao = dateString ? new Date(dateString) : new Date();
  }

}
