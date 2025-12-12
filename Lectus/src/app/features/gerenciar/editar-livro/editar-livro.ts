import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../../catalogo/service/livro.service';
import { CategoriaService } from '../../categorias/service/categoria.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Livro } from '../../../model/livro';
import { Categoria } from '../../../model/categoria';
import { EMPTY, switchMap } from 'rxjs'; 

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
  categorias = signal<Categoria[]>([
    { id: 1, nome: 'Ficção' },
    { id: 2, nome: 'Romance' },
    { id: 3, nome: 'Técnico' },
    { id: 4, nome: 'Fantasia' },
    { id: 5, nome: 'Terror' }
  ]);


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
          this.mensagem.set('Erro: ID do livro inválido na URL.');
          return EMPTY;
        }

        return this.livroService.buscarPorId(id);
      })
    ).subscribe({
      next: (livroCarregado) => {
        if (!livroCarregado) return;

        const livroAjustado = {
            ...livroCarregado,
            promocao: !!livroCarregado.promocao 
        };

        this.livro.set(livroAjustado);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar:', err);
        this.mensagem.set('Erro ao carregar os dados do livro.');
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


  onSave(form: NgForm) {
    if (form.invalid) {
      this.mensagem.set('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const dadosFormulario = this.livro();
    
    if (!dadosFormulario || !dadosFormulario.id) {
      this.mensagem.set('Erro: Livro não identificado.');
      return;
    }

    this.enviando.set(true);
    this.mensagem.set('');

    const livroCorrigido: Livro = {
      ...dadosFormulario,
      preco: Number(dadosFormulario.preco),
      estoque: Number(dadosFormulario.estoque),
      promocao: !!dadosFormulario.promocao,
      data_publicacao: new Date(dadosFormulario.data_publicacao)
    };

    console.log('Enviando para o service:', livroCorrigido);

    this.livroService.atualizarLivro(livroCorrigido).subscribe({
      next: () => {
        this.enviando.set(false);
        alert('Livro editado com sucesso!');
        this.router.navigate(['/catalogo']);
      },
      error: (err) => {
        this.enviando.set(false);
        console.error('Erro API:', err);
        const errorMsg = err.error?.message || err.statusText || 'Erro desconhecido';
        this.mensagem.set(`Erro ao salvar: ${errorMsg}`);
      }
    });
  }
  
}