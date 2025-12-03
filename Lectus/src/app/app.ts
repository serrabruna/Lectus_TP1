import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { MenuLateral } from './core/menu-lateral/menu-lateral';
import { Footer } from './core/footer/footer';
import { CadastroForm } from './features/cadastro/cadastro-form/cadastro-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CadastroForm, MenuLateral, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Lectus');
}
