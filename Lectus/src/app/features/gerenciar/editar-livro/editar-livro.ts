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

  // Adicione este método logo abaixo do onDataPublicacaoChange

  onSave(form: NgForm) {
    if (form.invalid) {
      this.mensagem.set('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dadosAtuais = this.livro();
    
    if (!dadosAtuais) {
      this.mensagem.set('Erro: Nenhum dado de livro carregado.');
      return;
    }

    this.enviando.set(true);
    this.mensagem.set('');

    // 1. Tratamento da Data
    let dataFormatada = '';
    if (dadosAtuais.data_publicacao) {
      if (dadosAtuais.data_publicacao instanceof Date) {
         dataFormatada = dadosAtuais.data_publicacao.toISOString().split('T')[0];
      } else {
         const stringData = String(dadosAtuais.data_publicacao);
         dataFormatada = stringData.split('T')[0];
      }
    }

    // 2. Montar o objeto CORRIGIDO
    // Removemos o ID do corpo para evitar confusão no backend
    const { id, ...restoDoLivro } = dadosAtuais;

    const livroParaEnviar = {
      ...restoDoLivro,
      data_publicacao: dataFormatada,
      categoria_id: Number(dadosAtuais.categoria_id),
      promocao: !!dadosAtuais.promocao,
      
      // !!! AQUI ESTÁ A CORREÇÃO PRINCIPAL !!!
      // Converte "25.00" (texto) para 25.00 (número)
      preco: Number(dadosAtuais.preco) 
    };

    console.log('JSON Enviado:', livroParaEnviar);

    // Envia o ID na URL (primeiro parâmetro) e o objeto sem ID no corpo
    // Se o seu serviço exigir o ID dentro do objeto, mude para: { id: id, ...livroParaEnviar }
    this.livroService.atualizarLivro({ id: id, ...livroParaEnviar }).subscribe({
      next: () => {
        this.enviando.set(false);
        alert('Livro atualizado com sucesso!');
        // this.router.navigate(['/catalogo']); // Descomente se quiser sair da tela
      },
      error: (err) => {
        this.enviando.set(false);
        console.error('Erro detalhado:', err);
        this.mensagem.set('Erro ao salvar. Verifique o console.');
      }
    });
  }
  
}