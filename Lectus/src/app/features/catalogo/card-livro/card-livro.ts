import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarrinhoService } from '../../carrinho/services/carrinho/carrinho.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Livro } from '../../../model/livro';
import { LivroService } from '../service/livro.service';
import { DescontoPipe } from '../../../shared/desconto-pipe/desconto-pipe';
import { QuantidadeControle } from '../../../shared/quantidade-controle/quantidade-controle';
import { Router } from '@angular/router';
import { Icones } from "../../../core/icones/icones";


@Component({
  selector: 'app-card-livro',
  standalone: true,
  imports: [
    CurrencyPipe,
    DescontoPipe,
    QuantidadeControle,
    Icones
],
  templateUrl: './card-livro.html',
  styleUrl: './card-livro.css',
})
export class CardLivro implements OnInit {

  private route = inject(ActivatedRoute);
  private livroService = inject(LivroService);
  private carrinhoService = inject(CarrinhoService);
  private logger = inject(LoggerService);
  private router = inject(Router);


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
    const livro = this.livro();
    const qtde = this.contador();

    if (!livro || qtde === 0) return;

    this.carrinhoService.adicionar(livro, qtde);

    this.logger.info('[CardLivro] adicionado ao carrinho', {
      id: livro.id,
      quantidade: qtde
    });
        this.router.navigate(['/carrinho']);


  }


  onView(): void {
    this.mostrarDetalhes.update(v => !v);
    if (!this.livro()) return;

    console.log('Ver detalhes do livro:', this.livro()!.id);

  }
}
