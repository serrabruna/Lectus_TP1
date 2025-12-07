import { Routes } from '@angular/router';
import { CadastroForm } from './features/cadastro/cadastro-form/cadastro-form';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { ListaCatalogo } from './features/catalogo/lista-catalogo/lista-catalogo';
import { CardLivro } from './features/catalogo/card-livro/card-livro';
import { LoginForm } from './features/login/login-form/login-form';
import { AdicionarLivro } from './features/catalogo/gerenciar/adicionar-livro/adicionar-livro';


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
      { path: 'adicionar-livro', component: AdicionarLivro},
      { path: '', redirectTo: 'catalogo', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'cadastro' },
];
