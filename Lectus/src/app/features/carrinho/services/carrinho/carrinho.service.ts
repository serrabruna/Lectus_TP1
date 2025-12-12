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

    //Lista interna
    private _itensPedido = signal<ItemPedido[]>(this._carregarLivros());

    //Computeds publicos
    itens = this._itensPedido; //expoe o signal
    qtdItens = computed(() => this._itensPedido().reduce((s, i) => s + i.quantidade, 0));
    valorTotal = computed(() => this._itensPedido().reduce((s, i) => s + i.quantidade * i.livro.preco, 0));

    constructor() {
        //persistir sempre que itens mudarem
        effect(() => {
            try {
                localStorage.setItem(chave, JSON.stringify(this._itensPedido()));
            } catch (e) {
                this.logger.warn('[CarrinhoService] falha ao persistir localStorage')
            }
        });
    }
    private _carregarLivros(): ItemPedido[] {
        try {
            const conteudo = localStorage.getItem(chave);
            if (!conteudo) return [];
            const listalivros = JSON.parse(conteudo) as ItemPedido[];
            return listalivros;
        } catch (e) {
            this.logger.warn('[CarrinhoService] erro lendo localStorage', e);
            return [];
        }
    }

    adicionar(livro: Livro, quantidade: number = 1) {
        if (!livro || !livro.id) return;
        const livros = this._itensPedido();
        const idx = livros.findIndex(it => it.id === livro.id);
        if (idx > -1) {
            //incrementa quantidade
            const lista_atualizada = livros.slice();
            lista_atualizada[idx] = { ...lista_atualizada[idx], quantidade: lista_atualizada[idx].quantidade + quantidade };
            this._itensPedido.set(lista_atualizada);
        } else {
            const newItem: ItemPedido = { id: livro.id, livro, quantidade };
            this._itensPedido.set([...livros, newItem]);
        }
        this.logger.info('[CarrinhoService] adicionar', { id: livro.id, quantidade });
    }
    remover(idLivro: number) {
        this._itensPedido.set(this._itensPedido().filter(i => i.id !== idLivro));
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
            const lista_atualizada = livros.slice();
            lista_atualizada[idx] = { ...lista_atualizada[idx], quantidade };
            this._itensPedido.set(lista_atualizada);
            this.logger.info('[CarrinhoService] atualizarQtd', { id: idLivro, quantidade });
        }
    }
    limpar() {
        this._itensPedido.set([]);
        this.logger.info('[CarrinhoService] limpar');
    }
}

