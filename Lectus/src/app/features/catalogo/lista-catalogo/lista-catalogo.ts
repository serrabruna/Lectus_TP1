import { Component, computed, inject, signal } from '@angular/core';
import { LivroService } from '../service/livro.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Livro } from '../../../model/livro';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-lista-catalogo',
  imports: [RouterLink, CommonModule],
  templateUrl: './lista-catalogo.html',
  styleUrl: './lista-catalogo.css',
})
export class ListaCatalogo {
  private livroService = inject(LivroService);
  private logger = inject(LoggerService);
  private router = inject(Router);

  loading = signal(true);
  alfabeto = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  filtroAtivo = signal<string>('H');

  private livroSignal = toSignal(
    this.livroService.listar(),
    { initialValue: [] }
  );

  livros = computed(() => {
    const lista = this.livroSignal();
    if(lista && this.loading()){
      this.loading.set(false);
    }

    const filtro = this.filtroAtivo();

    if (filtro === 'TODOS') {
        return lista.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    return lista
        .filter(l => l.titulo.startsWith(filtro))
        .sort((a, b) => a.titulo.localeCompare(b.titulo));
  });

  onFiltroAlfabetico(letra: string) {
      this.filtroAtivo.set(letra);
  }

}
