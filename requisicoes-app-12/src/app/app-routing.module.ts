import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { NotFoundComponent } from './components/public/not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'admin/painel', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin/painel',
    loadChildren: () =>
      import('./components/admin/painel/painel.module').then(
        (m) => m.PainelModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/departamento',
    loadChildren: () =>
      import('./components/admin/departamento/departamento.module').then(
        (m) => m.DepartamentoModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/funcionario',
    loadChildren: () =>
      import('./components/admin/funcionario/funcionario.module').then(
        (m) => m.FuncionarioModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/requisicao',
    loadChildren: () =>
      import('./components/admin/requisicao/requisicao.module').then(
        (m) => m.RequisicaoModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
