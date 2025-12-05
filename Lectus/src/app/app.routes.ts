import { Routes } from '@angular/router';
import { CadastroForm } from './features/cadastro/cadastro-form/cadastro-form';
import { Header } from './core/header/header';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
      { path: 'cadastro', component: CadastroForm },
      //{ path: 'login', component: LoginForm },
    ]
  },

  {
    path: '', 
    component: MainLayout,
    children: [
      //{ path: 'catalogo', component: CatalogoList },
    ]
  },
  
  { path: '**', redirectTo: 'cadastro' }, 
];