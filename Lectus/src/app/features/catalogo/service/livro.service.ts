import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Livro } from '../../../model/livro';
import { delay, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://apilojalivrospedro-production.up.railway.app';

  private logger = inject(LoggerService);

  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/livros`);
  } 

  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/livros/${id}`);
  }

  adicionarLivro(novoLivro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${this.apiUrl}/livros`, novoLivro);
  }

  atualizarLivro(livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/livros/${livro.id}`, livro);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/livros/${id}`);
  }
  
  simularAtualizacao(livro: Livro) { return this.atualizarLivro(livro); }
  simularDeletar(id: number) { return this.deletar(id); }


}
