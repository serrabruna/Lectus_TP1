import { Routes } from '@angular/router';
import { CadastroForm } from './features/cadastro/cadastro-form/cadastro-form';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { ListaCatalogo } from './features/catalogo/lista-catalogo/lista-catalogo';
import { CardLivro } from './features/catalogo/card-livro/card-livro';
import { LoginForm } from './features/login/login-form/login-form';
import { Carrinho } from './features/carrinho/carrinho/carrinho';
import { AdicionarLivro } from './features//gerenciar/adicionar-livro/adicionar-livro';
import { GerenciarLivros } from './features/gerenciar/gerenciar-livros/gerenciar-livros';
import { Historico } from './features/historico/historico';
import { Checkout } from './features/checkout/checkout';
import { ResumoPedido } from './features/resumo-pedido/resumo-pedido';


export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
      { path: 'cadastro', component: CadastroForm },
      { path: 'login', component: LoginForm },
    ]
  },

  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'catalogo', component: ListaCatalogo },
      { path: 'catalogo/:id', component: CardLivro },
      { path: 'carrinho', component: Carrinho },
      {
        path: 'gerenciar-livros',
        component: GerenciarLivros,
        children: [
          { path: 'adicionar', component: AdicionarLivro },
          //{ path: 'editar', component: EditarLivro },
          //{ path: 'deletar', component: DeletarLivro },
          { path: '', redirectTo: 'adicionar', pathMatch: 'full' }
        ]
      },
      { path: 'historico', component: Historico },
      { path: 'checkout', component: Checkout },
      { path: 'resumo-pedido', component: ResumoPedido },

      { path: '', redirectTo: 'catalogo', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'cadastro' },
];
