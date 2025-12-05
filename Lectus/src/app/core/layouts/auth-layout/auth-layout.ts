import { Component } from '@angular/core';
import { Header } from '../../header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-auth-layout',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

}
