import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { LoginForm } from './features/login/login-form/login-form';
import { MenuLateral } from './core/menu-lateral/menu-lateral';
import { Footer } from './core/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, LoginForm, MenuLateral, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('Lectus');
}
