import { Component } from '@angular/core';
import { MenuLateral } from '../../menu-lateral/menu-lateral';
import { Footer } from '../../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [MenuLateral, Footer, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
