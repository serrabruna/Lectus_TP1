import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { Header } from './core/header/header';
import { LoginForm } from './features/login/login-form/login-form';
import { MenuLateral } from './core/menu-lateral/menu-lateral';
import { Footer } from './core/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, LoginForm, MenuLateral, Footer],
=======
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainLayout, AuthLayout],
>>>>>>> main
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly title = signal('Lectus');
}
