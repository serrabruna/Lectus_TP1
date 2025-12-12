import { effect, inject, Injectable, signal, computed } from '@angular/core';
import { LoggerService } from '../../../../core/services/logger/logger.service';
import { ItemPedido } from '../../../../model/item-pedido';
import { Livro } from '../../../../model/livro';

const chave = 'lojatp1_carrinho';

@Injectable({
    providedIn: 'root'
})

export class CarrinhoService {
    private logger = inject(LoggerService);

    private _itensPedido = signal<ItemPedido[]>(this._carregarLivros());

    itens = this._itensPedido.asReadonly();
    qtdItens = computed(() => this._itensPedido().reduce((s, i) => s + i.quantidade, 0));
    valorTotal = computed(() => this._itensPedido().reduce((s, i) => s + i.quantidade * i.livro.preco, 0));

    constructor() {
        effect(() => {
        try {
            localStorage.setItem(chave, JSON.stringify(this._itensPedido()));
        } catch (e) {
            this.logger.warn('[CarrinhoService] falha ao persistir localStorage');
        }
        });
    }

    private _carregarLivros(): ItemPedido[] {
        try {
        if (typeof localStorage !== 'undefined') {
            const conteudo = localStorage.getItem(chave);
            if (!conteudo) return [];
            return JSON.parse(conteudo) as ItemPedido[];
        }
        return [];
        } catch (e) {
        this.logger.warn('[CarrinhoService] erro lendo localStorage', e);
        return [];
        }
    }

    adicionar(livro: Livro, quantidade: number = 1) {
    if (!livro || !livro.id) return; 

    this._itensPedido.update(itens => {
      const livroId = livro.id!; 

      const idx = itens.findIndex(it => it.id === livroId);
      
      if (idx > -1) {
        const novosItens = [...itens];
        novosItens[idx] = { 
          ...novosItens[idx], 
          quantidade: novosItens[idx].quantidade + quantidade 
        };
        return novosItens;
      } else {
        const newItem: ItemPedido = { id: livroId, livro, quantidade };
        return [...itens, newItem];
      }
    });
    
    this.logger.info('[CarrinhoService] adicionar', { id: livro.id!, quantidade });
  }

    remover(idLivro: number) {
        this._itensPedido.update(itens => itens.filter(i => i.id !== idLivro && i.livro.id !== idLivro));
        this.logger.info('[CarrinhoService] remover', idLivro);
    }

    atualizarQtd(idLivro: number, quantidade: number) {
        if (quantidade <= 0) {
        this.remover(idLivro);
        return;
        }
        
        this._itensPedido.update(itens => 
        itens.map(item => 
            (item.id === idLivro || item.livro.id === idLivro) 
            ? { ...item, quantidade } 
            : item
        )
        );
    }

    limpar() {
        this._itensPedido.set([]);
        this.logger.info('[CarrinhoService] limpar');
    }
}

