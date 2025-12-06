import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Livro } from '../../../model/livro';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private logger = inject(LoggerService);
  
  private readonly mockLivros: Livro[] = [
    {
      id: 1,
      categoria_id: 1,
      titulo: "Harry Potter and The Cursed Child",
      autor: "J.K Rowling",
      isbn: "1234",
      preco: 149.90,
      estoque: 100,
      sinopse: "Sempre foi difícil ser Harry Potter e não é mais fácil agora que ele é um sobrecarregado funcionário do Ministério da Magia, marido e pai de três crianças em idade escolar. Enquanto Harry lida com um passado que se recusa a ficar para trás, seu filho mais novo, Alvo, deve lutar com o peso de um legado de família que ele nunca quis. À medida que passado e presente se fundem de forma ameaçadora, ambos, pai e filho, aprendem uma incômodaverdade: às vezesas trevas vêmde lugares inesperados.",
      editora: "Darkside",
      imageURL: "http://blogs.timesofindia.indiatimes.com/wp-content/uploads/2016/08/Harry-Potter-and-the-Cursed-Child.jpg",
      data_publicacao: new Date('2019-31-10')
    }
  ];

  listar(): Observable<Livro[]>{
    this.logger.info('[LivroService] Simulação de listagem de livros.');
    return of(this.mockLivros).pipe(delay(500));
  }

  adicionarLivro(novoLivro: Livro): Observable<Livro>{
    this.logger.info('[LivroService] Simulação de adição de um livro.');
    const novoId = this.mockLivros.length + 1;
    const livroAdicionado = { ...novoLivro, id: novoId };

    this.mockLivros.push(livroAdicionado);

    return of (livroAdicionado).pipe(delay(500));
  }
}
