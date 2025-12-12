import { Injectable, inject } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { Usuario } from '../../../model/usuario';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private readonly apiUrl = '/api';

  /**
    private http = inject(HttpClient);
    private logger = inject(LoggerService);

  //para referencia futura
    private apiURL = ''

    Simular a chamada POST para cadastrar um novo usuário.
    Quando a API estiver pronta, basta substituir o código interno
    pelo this.http.post(this.apiUrl, usuario).
   */

  cadastrarUsuario(usuario: Usuario): Observable<any> {
    console.log('[CadastroService] Simulando cadastro para: ', usuario);
    // this.logger.info('[UsuarioService] simular cadastro', usuario);

    //Simula uma resposta de sucesso (com 200ms de latência)
    if (usuario.email.includes('erro')) {
      return throwError(() => new Error('Erro de validação simulado no backend')).pipe(delay(200));
    }

    // Simula o objeto de resposta da API (com o ID gerado)
    const respostaMock = {
      ...usuario,
      id: Math.floor(Math.random() * 1000) + 1,
      tipo_usuario: 'CLIENTE',
      message: 'Usuário cadastrado com sucesso (Simulado)'
    };

    return of(respostaMock).pipe(delay(200));
  }




}
