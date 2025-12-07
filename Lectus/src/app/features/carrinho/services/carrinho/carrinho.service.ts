// import { effect, inject, Injectable, signal } from '@angular/core';
// import { LoggerService } from '../../../../core/services/logger/logger.service';
// import { ItemPedido } from '../../../../model/item-pedido';

// const chave = 'lojatp1_carrinho';

// @Injectable({
//   providedIn: 'root',
// })
// export class CarrinhoService {
//   private logger = inject(LoggerService);

//   //Lista interna
//   private _itensPedido = signal<ItemPedido[]>(this._carregarLivros());

//   //Computeds publicos
//   itens = this._itensPedido; //expoe o signal
//   qtdItens = computed(()=> this._itensPedido().reduce((s,i) => s + i.quantidade,0));
//   valorTotal = computed(()=> this._itensPedido().reduce((s,i) => s + i.quantidade * i.livro.preco,0));

//   constructor(){
//     //persistir sempre que itens mudarem
//     effect(()=>{
//       try{
//         localStorage.setItem(chave,JSON.stringify(this._itensPedido()));
//       }catch(e){
//         this.logger.warn('[CarrinhoService] falha ao persistir localStorage')
//       }
//     })
//   }
// }
