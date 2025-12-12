import { Injectable, inject } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { loginUsuario } from '../../../model/loginUsuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private readonly apiUrl = '/api';

  logarUsuario(login: loginUsuario): Observable<any> {
    console.log('[LoginService] Simulando login para: ', login);

    if (login.email.includes('erro')) {
      return throwError(() => new Error('Erro de validação simulado no backend')).pipe(delay(200));
    }

    const respostaMock = {
      ...login,
      id: Math.floor(Math.random() * 1000) + 1,
      tipo_usuario: 'CLIENTE',
      message: 'Usuário logado com sucesso (Simulado)'
    };

    return of(respostaMock).pipe(delay(200));
  }




}
