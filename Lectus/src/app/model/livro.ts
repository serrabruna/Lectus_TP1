export interface Livro{
    id: number;
    categoria_id: number;
    titulo: string;
    autor: string;
    isbn: string;
    preco: number;
    estoque: number;
    sinopse: string;
    imageURL: string;
    data_publicacao: Date;
    empromocao?: boolean;
}