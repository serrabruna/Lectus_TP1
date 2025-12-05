import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../core/header/header';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { loginUsuario } from '../../../model/loginUsuario';
import { LoginService } from '../service/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-form',
  standalone: true,
imports: [CommonModule, FormsModule, Header],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})

export class LoginForm {
  private router = inject(Router);
  private loginService = inject(LoginService)

  enviando = signal(false);
  mensagem = signal('');

  Usuario: loginUsuario = {
    email: '',
    senha: ''
  };

  onSubmit(form: NgForm){
    if(form.invalid){
      this.mensagem.set("Preencha todos os campos obrigatórios.");
    }

    this.enviando.set(true);
    this.mensagem.set('Login Realizado com sucesso! Redirecionando...');

    this.loginService.logarUsuario(this.Usuario).subscribe({
      next: (res) => {
        console.log('Resposta de login (mocked): ', res);
        this.mensagem.set('Login realizado com sucesso! Redirecionando...');

        form.resetForm();
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        console.error('Erro no login (mocked): ', err);
        this.mensagem.set(`Erro ao logar: ${err.message}. Tente novamente. `);
        this.enviando.set(false);
      },
      complete: () => {
        this.enviando.set(false);
      }
    })
  }
}
