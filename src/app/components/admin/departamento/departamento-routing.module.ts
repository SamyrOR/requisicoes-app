import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartamentoComponent } from './departamento.component';
import { SharedModule } from 'primeng';


const routes: Routes = [
  { path: '', component: DepartamentoComponent}
];

@NgModule({
  declarations:[DepartamentoComponent],
  imports: [RouterModule.forChild(routes),
            SharedModule,
            ReactiveFormsModule,
            DepartamentoRoutingModule],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
