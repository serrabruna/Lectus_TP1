import { Livro } from "./livro";

export interface ItemPedido{
    livro: Livro;
    quantidade: number;
}