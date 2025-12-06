export interface Livro {
    id: number;
    categoria_id: number;
    titulo: string;
    autor: string;
    isbn: string;
    preco: number;
    estoque: number;
    sinopse: string;
    editora: string;
    imageURL: string;
    data_publicacao: Date;
    empromocao?: boolean;
}

export class LivroMapper {
    static fromJson(json: any): Livro {
        return{
            id: json.id,
            categoria_id: json.categoria_id,
            titulo: json.titulo,
            autor: json.autor,
            isbn: json.isbn,
            preco: json.preco,
            estoque: json.estoque,
            sinopse: json.sinopse,
            editora: json.editora,
            imageURL: json.imageURL,
            data_publicacao: json.data_publicacao,
            empromocao: json.empromocao
        };
    }

    static toJson(livro: Livro): any {
        return {
            id: livro.id,
            categoria_id: livro.categoria_id,
            titulo: livro.titulo,
            autor: livro.autor,
            isbn: livro.isbn,
            preco: livro.preco,
            estoque: livro.estoque,
            sinopse: livro.sinopse,
            editora: livro.editora,
            imageURL: livro.imageURL,
            data_publicacao: livro.data_publicacao,
            empromocao: livro.empromocao
        };
    }
}
