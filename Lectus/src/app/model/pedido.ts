import { ItemPedido } from './item-pedido';
import { Endereco } from './endereco';

export interface Pedido {
    id: number;
    itens: ItemPedido[];
    total: number;
    endereco: Endereco;
    metodoPagamento: string;
    data: Date;
}
