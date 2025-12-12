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

  onSubmit(form: NgForm){
    if(form.invalid){
      this.mensagem.set("Preencha todos os campos obrigatórios.");
      return; 
    }

    this.enviando.set(true);
    this.mensagem.set('A processar login...');

    this.loginService.logarUsuario(this.userLogin).subscribe({
      next: (res) => {
        console.log('Login efetuado:', res);
        

        this.mensagem.set('Login realizado com sucesso! Redirecionando...');
        form.resetForm();
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        const msgErro = err.error?.message || err.statusText || 'Erro desconhecido';
        this.mensagem.set(`Erro ao logar: ${msgErro}. Tente novamente.`);
        this.enviando.set(false);
      },
      complete: () => {
        this.enviando.set(false);
      }
    })
  }
}
