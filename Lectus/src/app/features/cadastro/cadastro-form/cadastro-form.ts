import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../core/header/header';
import { FormsModule } from '@angular/forms';
import { Footer } from '../../../core/footer/footer';
import { Router } from '@angular/router';
import { Usuario } from '../../../model/usuario';

@Component({
  selector: 'app-cadastro-form',
  imports: [Header, FormsModule, Footer],
  templateUrl: './cadastro-form.html',
  styleUrl: './cadastro-form.css',
})
export class CadastroForm {
  private router = inject(Router);

  enviando = signal(false);
  mensagem = signal('');

  novoUsuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    telefone: ''
  }

  
  
}
