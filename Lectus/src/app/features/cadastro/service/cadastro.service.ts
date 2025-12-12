import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../../../model/usuario';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../assets/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private http = inject(HttpClient);
  private logger = inject(LoggerService);
  private readonly apiUrl = environment.apiUrl;

  cadastrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, usuario).pipe(
      map((resposta) => {
        this.logger.info('[CadastroService] Usuário cadastrado', resposta);
        return resposta;
      }),
      catchError((erro) => {
        this.logger.error('[CadastroService] Erro ao cadastrar usuário', erro);
        return throwError(() => erro);
      })
    );
  }
}
