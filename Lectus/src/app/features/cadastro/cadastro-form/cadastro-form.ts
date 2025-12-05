import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../core/header/header';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../model/usuario';
import { CadastroService } from '../service/cadastro.service';

@Component({
  selector: 'app-cadastro-form',
  imports: [Header, FormsModule],
  templateUrl: './cadastro-form.html',
  styleUrl: './cadastro-form.css',
})
export class CadastroForm {
  private router = inject(Router);
  private cadastroService = inject(CadastroService)

  enviando = signal(false);
  mensagem = signal('');

  novoUsuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    telefone: ''
  };

  onSubmit(form: NgForm){
    if(form.invalid){
      this.mensagem.set("Preencha todos os campos obrigatórios.");
    }

    this.enviando.set(true);
    this.mensagem.set('Cadastro Realizado com sucesso! Redirecionando...');

    this.cadastroService.cadastrarUsuario(this.novoUsuario).subscribe({
      next: (res) => {
        console.log('Resposta de cadastro (mocked): ', res);
        this.mensagem.set('Cadastro realizado com sucesso! Redirecionando...');

        form.resetForm();
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        console.error('Erro no cadastro (mocked): ', err);
        this.mensagem.set(`Erro ao cadastrar: ${err.message}. Tente novamente. `);
        this.enviando.set(false);
      },
      complete: () => {
        this.enviando.set(false);
      }
    })
  }


  
  
}
