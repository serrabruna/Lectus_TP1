import { Routes } from '@angular/router';
import { Cadastro } from './features/cadastro/cadastro';

export const routes: Routes = [
    {path: '', redirectTo: 'cadastro', pathMatch: 'full'},
    {path: 'cadastro', component: Cadastro}
];
