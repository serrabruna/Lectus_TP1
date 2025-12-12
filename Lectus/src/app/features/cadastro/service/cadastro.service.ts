import { Injectable, inject } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { Usuario } from '../../../model/usuario';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://apilojalivrospedro-production.up.railway.app';

  cadastrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, usuario);
  }

}
