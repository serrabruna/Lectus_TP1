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
  private readonly apiUrl = 'https://apilectus-production.up.railway.app';

  private logger = inject(LoggerService);

  listar(): Observable<Livro[]> {
    // VERIFIQUE NO SWAGGER: O endpoint correto é /livro ou /livros?
    return this.http.get<Livro[]>(`${this.apiUrl}/livro`);
  } 

  // BUSCAR LIVRO POR ID
  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/livro/${id}`);
  }

  // ADICIONAR LIVRO
  adicionarLivro(novoLivro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${this.apiUrl}/livro`, novoLivro);
  }

  atualizarLivro(livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/livro/${livro.id}`, livro);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/livro/${id}`);
  }
  
  simularAtualizacao(livro: Livro) { return this.atualizarLivro(livro); }
  simularDeletar(id: number) { return this.deletar(id); }


}
