import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginUsuario } from '../../../model/loginUsuario';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://apilectus-production.up.railway.app';

  logarUsuario(login: loginUsuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, login);
  }
}