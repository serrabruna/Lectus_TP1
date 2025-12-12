import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../catalogo/service/livro.service';
import { Livro } from '../../../model/livro';
import { CategoriaService } from '../../categorias/service/categoria.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Categoria } from '../../../model/categoria';

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

  categorias = signal<Categoria[]>([
    { id: 1, nome: 'Ficção' },
    { id: 2, nome: 'Romance' },
    { id: 3, nome: 'Técnico' },
    { id: 4, nome: 'Fantasia' },
    { id: 5, nome: 'Terror' }
  ]);

  novoLivro: Livro = {
    categoria_id: 1,
    titulo: '',
    autor: '',
    isbn: '',
    preco: 0,
    estoque: 1, 
    sinopse: '',
    editora: '',
    image_url: '',
    data_publicacao: new Date(),
    promocao: false, 
  };

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.mensagem.set('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.enviando.set(true);
    this.mensagem.set('Adicionando Livro...');

    const livroParaEnviar = {
      ...this.novoLivro,
      categoria_id: Number(this.novoLivro.categoria_id),
      preco: Number(this.novoLivro.preco),
      estoque: Number(this.novoLivro.estoque),
      promocao: !!this.novoLivro.promocao,
      data_publicacao: new Date(this.novoLivro.data_publicacao)
    };

    console.log('Enviando novo livro:', livroParaEnviar);

    this.livroService.adicionarLivro(livroParaEnviar).subscribe({
      next: (res) => {
        this.mensagem.set(`Livro "${res.titulo}" adicionado com sucesso!`);
        this.enviando.set(false);
        
        form.resetForm(); 
        
        this.resetarModelo();
      },
      error: (err) => {
        console.error('Erro detalhado:', err);
        const msgErro = err.error?.message || err.statusText || 'Erro desconhecido';
        this.mensagem.set(`Erro ao adicionar livro: ${msgErro}`);
        this.enviando.set(false);
      }
    });
  }

  onDataPublicacaoChange(dateString: string) {
    this.novoLivro.data_publicacao = dateString ? new Date(dateString) : new Date();
  }
  
  private resetarModelo() {
    this.novoLivro = {
      categoria_id: 1,
      titulo: '',
      autor: '',
      isbn: '',
      preco: 0,
      estoque: 1,
      sinopse: '',
      editora: '',
      image_url: '',
      data_publicacao: new Date(),
      promocao: false
    };
  }
}
