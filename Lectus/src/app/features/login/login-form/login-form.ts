import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../core/header/header';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { loginUsuario } from '../../../model/loginUsuario';
import { LoginService } from '../service/login.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../model/usuario';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})

export class LoginForm {
  private router = inject(Router);
  private loginService = inject(LoginService)

  userLogin: loginUsuario = {
    email: '',
    senha: ''
  };

  enviando = signal(false);
  mensagem = signal('');

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.mensagem.set("Preencha todos os campos.");
      return;
    }

    this.enviando.set(true);
    this.mensagem.set('Autenticando...');

    this.loginService.logarUsuario(this.userLogin).subscribe({
      next: (response: any) => {
        if (response && response.token) {
          console.log('Login successful!');
      
          localStorage.setItem('auth_token', response.token);
          this.mensagem.set('Login realizado! Redirecionando...');
          
          setTimeout(() => {
            this.router.navigate(['/']); // Go to home
          }, 1000);
        } else {
           this.mensagem.set('Erro inesperado no servidor.');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.enviando.set(false);

        if (err.status === 401 || err.status === 404) {
          this.mensagem.set('Email ou senha incorretos.');
        } else {
          this.mensagem.set('Erro de conexão. Tente novamente mais tarde.');
        }
      },
      complete: () => {
        this.enviando.set(false);
      }
    });
  }
}

