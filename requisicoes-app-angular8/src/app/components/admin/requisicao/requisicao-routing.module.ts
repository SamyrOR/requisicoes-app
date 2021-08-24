import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisicaoComponent } from './requisicao.component';


const routes: Routes = [
  { path: '', component: RequisicaoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisicaoRoutingModule { }
