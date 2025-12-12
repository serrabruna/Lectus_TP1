import { inject, Injectable } from '@angular/core';
import { Livro } from '../../../model/livro';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private http = inject(HttpClient);
  private readonly apiUrl = '/api';

  listar(): Observable<Livro[]> {
    return this.http.get<any>(`${this.apiUrl}/livros`).pipe(
      map(resposta => resposta.object) 
    );
  } 

  buscarPorId(id: number): Observable<Livro> {
  return this.http.get<any>(`${this.apiUrl}/livros/${id}`).pipe(
    map(resposta => resposta.object) 
  );
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
}