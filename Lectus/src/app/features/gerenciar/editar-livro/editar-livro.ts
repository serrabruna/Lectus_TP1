import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LivroService } from '../../catalogo/service/livro.service';
import { CategoriaService } from '../../categorias/service/categoria.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Livro } from '../../../model/livro';
import { Categoria } from '../../../model/categoria';
import { of, switchMap, throwError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-editar-livro',
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './editar-livro.html',
  styleUrl: './editar-livro.css',
})
export class EditarLivro {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private livroService = inject(LivroService);
  private categoriaService = inject(CategoriaService);

  livro = signal<Livro | null>(null);
  categorias: Signal<Categoria[]> = toSignal(this.categoriaService.listar(), { initialValue: [] });

  enviando = signal(false);
  mensagem = signal('');
  loading = signal(true);

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

  onDataPublicacaoChange(dateString: string) {
    if (this.livro()) {
      this.livro.update(l => ({
        ...l!,
        data_publicacao: dateString ? new Date(dateString) : new Date()
      }));
    }
  }

  onSave(form: NgForm): void {
    if (form.invalid || !this.livro()) {
      this.mensagem.set('Preencha todos os campos obrigatórios.');
      return;
    }

    this.enviando.set(true);
    this.mensagem.set('Salvando alterações...');

    const livroAtualizado = this.livro()!;
    
    this.livroService.atualizarLivro(livroAtualizado).subscribe({
      next: () => {
        this.mensagem.set(`Livro "${livroAtualizado.titulo}" atualizado com sucesso!`);
        this.enviando.set(false);
      },
      error: (err) => {
        console.error('Erro ao salvar livro:', err);
        const errorMsg = err.error?.message || err.message || 'Erro desconhecido';
        this.mensagem.set(`Erro ao salvar: ${errorMsg}.`);
        this.enviando.set(false);
      },
    });
  }
}