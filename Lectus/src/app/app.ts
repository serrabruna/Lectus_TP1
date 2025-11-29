import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { Cadastro } from './features/cadastro/cadastro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Cadastro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Lectus');
}
