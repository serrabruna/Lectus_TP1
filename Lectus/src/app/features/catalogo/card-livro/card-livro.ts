import { Component, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livro } from '../../../model/livro';
import { CurrencyPipe } from '@angular/common';
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
export class CardLivro {

  private route = inject(ActivatedRoute);

  // Input (somente leitura)
  livroInput = input<Livro | null>(null);

  // Signal interno (editável)
  livro = signal<Livro | null>(null);

  contador = signal(0);

  add = output<{ id: number; quantity: number }>();
  view = output<number>();

 ngOnInit() {
  // Veio do componente pai
  if (this.livroInput()) {
    this.livro.set(this.livroInput());
    return;
  }
this.livro.set({
  id: 1,
  categoria_id: 1,
  titulo: 'Livro Teste',
  autor: 'Autor Teste',
  isbn: '123456789',
  preco: 59.90,
  estoque: 10,
  sinopse: 'Sinopse de teste',
  imageURL: 'https://via.placeholder.com/300x450',
  data_publicacao: new Date('2023-01-01'),
  empromocao: true,
});

}


  onAdd() {
    if (!this.livro() || this.contador() === 0) return;

    this.add.emit({
      id: this.livro()!.id,
      quantity: this.contador(),
    });
  }

  onView() {
    if (!this.livro()) return;
    this.view.emit(this.livro()!.id);
  }
}
