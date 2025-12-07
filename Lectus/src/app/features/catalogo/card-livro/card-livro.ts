import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { Livro } from '../../../model/livro';
import { LivroService } from '../service/livro.service';
import { DescontoPipe } from '../../../shared/desconto-pipe/desconto-pipe';
import { QuantidadeControle } from '../../../shared/quantidade-controle/quantidade-controle';

@Component({
  selector: 'app-card-livro',
  standalone: true,
  imports: [
    CurrencyPipe,
    DescontoPipe,
    QuantidadeControle
  ],
  templateUrl: './card-livro.html',
  styleUrl: './card-livro.css',
})
export class CardLivro implements OnInit {

  private route = inject(ActivatedRoute);
  private livroService = inject(LivroService);

  livro = signal<Livro | null>(null);
  contador = signal(0);
  mostrarDetalhes = signal(false);


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      console.error('ID inválido');
      return;
    }

    this.livroService.buscarPorId(id).subscribe({
      next: (livro) => this.livro.set(livro),
      error: () => console.error('Livro não encontrado')
    });
  }

  onAdd(): void {
    if (!this.livro() || this.contador() === 0) return;

    console.log('Adicionar livro:', {
      id: this.livro()!.id,
      quantidade: this.contador(),
    });
  }

  onView(): void {
    this.mostrarDetalhes.update(v => !v);
    if (!this.livro()) return;

    console.log('Ver detalhes do livro:', this.livro()!.id);
  }

}
