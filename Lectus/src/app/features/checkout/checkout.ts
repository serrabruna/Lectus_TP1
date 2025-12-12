import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco } from '../../model/endereco';
import { CarrinhoService } from '../carrinho/services/carrinho/carrinho.service';
import { HistoricoService } from '../historico/services/historico/historico.service';
import { Pagamento } from '../../model/pagamento';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  private carrinho = inject(CarrinhoService);
  private historico = inject(HistoricoService);
  private router = inject(Router);

  mensagem = signal('');
  nomeUsuario = '';

  novoEndereco: Endereco = {
    cep: '',
    rua: '',
    numero: 0,
    bairro: '',
    cidade: '',
    estado: '',
    complemento: ''
  };
  metodos = ['Credito', 'Débito', 'Pix'];
  metodoSelecionado = '';


  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.mensagem.set('Preencha todos os campos obrigatórios.');
      return;
    }

    const pedido: any = { 
      itens: this.carrinho.itens(),
      total: this.carrinho.valorTotal(),
      endereco: this.novoEndereco,
      metodoPagamento: this.metodoSelecionado,
      data: new Date()
    };

    this.mensagem.set('Processando pedido...');

    this.historico.registrarPedido(pedido).subscribe({
      next: (pedidoCriado: any) => { 
        console.log('Pedido criado:', pedidoCriado);
        
        this.carrinho.limpar();
        
        this.router.navigate(['/resumo-pedido'], {
          state: {
            nomeUsuario: this.nomeUsuario,
            pedido: pedidoCriado
          }
        });
      },
      error: (err: any) => { 
        console.error('Erro no checkout:', err);
        this.mensagem.set('Erro ao processar pedido. Tente novamente.');
      }
    });
  }
}
