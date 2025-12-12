import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco } from '../../model/endereco';
import { CarrinhoService } from '../carrinho/services/carrinho/carrinho.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  private carrinho = inject(CarrinhoService);
  private router = inject(Router);

  mensagem = signal('');
  nomeUsuario = '';
  metodoSelecionado = '';
  
  metodos = ['Crédito', 'Débito', 'Pix'];

  novoEndereco: Endereco = {
    cep: '', rua: '', numero: 0, bairro: '', cidade: '', estado: '', complemento: ''
  };

  onSubmit(form: NgForm) {
    // 1. Validações
    if (this.carrinho.qtdItens() === 0) {
      this.mensagem.set('Seu carrinho está vazio.');
      return;
    }

    if (form.invalid || !this.metodoSelecionado) {
      this.mensagem.set('Preencha todos os campos e selecione o pagamento.');
      return;
    }

    const pedido = {
      id: Date.now(),
      data: new Date(),
      itens: this.carrinho.itens(),
      total: this.carrinho.valorTotal(),
      endereco: { ...this.novoEndereco },
      metodoPagamento: this.metodoSelecionado,
      status: 'REALIZADO'
    };

    console.log('Pedido processado offline:', pedido);

    this.carrinho.limpar();

    alert('Pedido finalizado com sucesso!');
    this.router.navigate(['/historico']);
  }
}