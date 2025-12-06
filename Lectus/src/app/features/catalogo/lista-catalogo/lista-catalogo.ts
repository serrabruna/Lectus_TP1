import { Component, computed, inject, signal, effect } from '@angular/core';
import { LivroService } from '../service/livro.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Livro } from '../../../model/livro';
import { CommonModule} from '@angular/common';
import { Icones } from "../../../core/icones/icones";

@Component({
  selector: 'app-lista-catalogo',
  imports: [RouterLink, CommonModule, Icones],
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

  constructor(){
    effect( () => {
      const lista = this.livroSignal();

      if(lista.length > 0 && this.loading()){
        this.loading.set(false);
      }
    }, {allowSignalWrites: true});
  }

  livros = computed(() => {
    const lista = this.livroSignal();
    const filtro = this.filtroAtivo().toUpperCase();

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
