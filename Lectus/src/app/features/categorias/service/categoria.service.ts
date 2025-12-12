import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { delay, Observable, of } from 'rxjs';
import { Categoria } from '../../../model/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private logger = inject(LoggerService);
  private readonly apiUrl = '/api';

  private readonly mockCategorias = [
    {
      id: 1,
      nome: "Fantasia"
    },
    {
      id: 2,
      nome: "Terror"
    },
    {
      id: 3,
      nome: "Suspensa"
    }
  ];

  listar(): Observable<Categoria[]> {
    this.logger.info('[LivroService] Simulação de listagem de livros.');
    return of(this.mockCategorias).pipe(delay(500));
  }
}
