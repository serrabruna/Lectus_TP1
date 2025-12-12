import { Component, inject, OnInit, signal } from '@angular/core';
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
export class DeletarLivro implements OnInit {
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

            this.mensagem.set('');
            this.livro.set(null); 

            if (!idParam || isNaN(id) || id <= 0) {
                this.loading.set(false);
                this.mensagem.set('Erro: ID inválido.');
                return EMPTY; 
            }
            
            this.loading.set(true);
            return this.livroService.buscarPorId(id);
        })
    ).subscribe({
        next: (livroCarregado) => {
            this.livro.set(livroCarregado);
            this.loading.set(false);
        },
        error: (err) => {
            console.error('Erro ao carregar:', err);
            this.mensagem.set('Livro não encontrado.');
            this.loading.set(false);
        },
    });
  }

  onDelete(): void {
    const livroAtual = this.livro();

    if (!livroAtual || !livroAtual.id) {
        this.mensagem.set('Erro: Dados do livro incompletos (ID ausente).');
        return;
    }

    if (!confirm(`Tem certeza que deseja DELETAR o livro: "${livroAtual.titulo}"?`)) {
        return;
    }

    this.enviando.set(true);
    this.mensagem.set('Deletando livro...');
    
    this.livroService.deletar(livroAtual.id).subscribe({
      next: () => {
        this.mensagem.set(`Livro deletado com sucesso!`);
        this.livro.set(null); // Remove da tela imediatamente
        this.enviando.set(false);
        
        setTimeout(() => {
            this.router.navigate(['/catalogo']);
        }, 1500);
      },
      error: (err) => {
        console.error('Erro ao deletar:', err);
        const errorMsg = err.error?.message || err.statusText || 'Erro desconhecido';
        this.mensagem.set(`Erro ao deletar: ${errorMsg}`);
        this.enviando.set(false);
      },
    });
  }
}
