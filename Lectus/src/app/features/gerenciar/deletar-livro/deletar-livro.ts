import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LivroService } from '../../catalogo/service/livro.service';
import { Livro } from '../../../model/livro';
import { EMPTY, switchMap } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-deletar-livro',
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './deletar-livro.html',
  styleUrl: './deletar-livro.css',
})
export class DeletarLivro {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private livroService = inject(LivroService);

  livro = signal<Livro | null>(null);
  loading = signal(true); 
  enviando = signal(false);
  mensagem = signal('');

  ngOnInit(): void {
    this.route.paramMap.pipe(
        switchMap(params => {
            const idParam = params.get('id');
            const id = Number(idParam);

            this.loading.set(true);
            this.mensagem.set('');
            this.livro.set(null); 

            if (!idParam || isNaN(id) || id <= 0) {
                this.loading.set(false);
                this.mensagem.set('Erro: ID do livro inválido na URL. Por favor, verifique a rota.');
                // Observable vazio para encerrar a busca sem erro de console RxJS
                return EMPTY; 
            }
            
            return this.livroService.buscarPorId(id);
        })
    ).subscribe({
        next: (livroCarregado) => {
            if (livroCarregado === null) {
                  return;
            }
            this.livro.set(livroCarregado);
            this.loading.set(false);
        },
        error: (err) => {
            console.error('Erro ao carregar livro para edição:', err);
            this.mensagem.set('Livro não encontrado ou erro ao carregar os dados.');
            this.loading.set(false);
        },
    });
  }

  onDelete(): void{
    const livro = this.livro();

    if (!livro || !livro.id) {
        this.mensagem.set('Erro: Não é possível deletar um livro sem ID.');
        return;
    }

    if (!confirm(`Tem certeza que deseja DELETAR o livro: "${livro.titulo}"?`)) {
        return;
    }
    this.enviando.set(true);
    this.mensagem.set('Deletando livro...');
    
    this.livroService.deletar(livro.id).subscribe({
      next: () => {
        this.mensagem.set(`Livro deletado com sucesso!`);
        this.livro.set(null);
        this.enviando.set(false);
        // Redirecionar é uma boa prática aqui
        setTimeout(() => this.router.navigate(['/gerenciar-livros']), 1500);
      },
      error: (err) => {
        console.error('Erro ao deletar livro:', err);
        const errorMsg = err.error?.message || err.message;
        this.mensagem.set(`Erro ao deletar: ${errorMsg}.`);
        this.enviando.set(false);
      },
    });
  }
}
