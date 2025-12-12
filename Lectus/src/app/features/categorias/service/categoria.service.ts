import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { delay, Observable, of } from 'rxjs';
import { Categoria } from '../../../model/categoria';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../assets/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }
}
