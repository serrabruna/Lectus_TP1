import { effect, inject, Injectable, signal, computed } from '@angular/core';
import { LoggerService } from '../../../../core/services/logger/logger.service';
import { ItemPedido } from '../../../../model/item-pedido';
import { Livro } from '../../../../model/livro';

const chave = 'lojatp1_carrinho';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private logger = inject(LoggerService);
  private readonly apiUrl = '/api'; 

  private _itensPedido = signal<ItemPedido[]>(this._carregarLivros());

  itens = this._itensPedido;
  qtdItens = computed(() =>
    this._itensPedido().reduce((s, i) => s + i.quantidade, 0)
  );
  valorTotal = computed(() =>
    this._itensPedido().reduce(
      (s, i) => s + i.quantidade * i.livro.preco,
      0
    )
  );

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(chave, JSON.stringify(this._itensPedido()));
      } catch (e) {
        this.logger.warn('[CarrinhoService] falha ao persistir localStorage', e);
      }
    });
  }

  private _carregarLivros(): ItemPedido[] {
    try {
      const conteudo = localStorage.getItem(chave);
      if (!conteudo) return [];
      return JSON.parse(conteudo) as ItemPedido[];
    } catch (e) {
      this.logger.warn('[CarrinhoService] erro lendo localStorage', e);
      return [];
    }
  }

  adicionar(livro: Livro, quantidade: number = 1) {
    if (!livro) return;
    const livros = this._itensPedido();
    const idx = livros.findIndex(it => it.id === livro.id);

    if (idx > -1) {
      const lista = livros.slice();
      lista[idx] = {
        ...lista[idx],
        quantidade: lista[idx].quantidade + quantidade,
      };
      this._itensPedido.set(lista);
    } else {
      this._itensPedido.set([
        ...livros,
        { id: livro.id, livro, quantidade },
      ]);
    }

    this.logger.info('[CarrinhoService] adicionar', {
      id: livro.id,
      quantidade,
    });
  }

  remover(idLivro: number) {
    this._itensPedido.set(
      this._itensPedido().filter(i => i.id !== idLivro)
    );
    this.logger.info('[CarrinhoService] remover', idLivro);
  }

  atualizarQtd(idLivro: number, quantidade: number) {
    if (quantidade <= 0) {
      this.remover(idLivro);
      return;
    }

    const livros = this._itensPedido();
    const idx = livros.findIndex(i => i.id === idLivro);

    if (idx > -1) {
      const lista = livros.slice();
      lista[idx] = { ...lista[idx], quantidade };
      this._itensPedido.set(lista);
      this.logger.info('[CarrinhoService] atualizarQtd', {
        id: idLivro,
        quantidade,
      });
    }
  }

  limpar() {
    this._itensPedido.set([]);
    this.logger.info('[CarrinhoService] limpar');
  }
}
