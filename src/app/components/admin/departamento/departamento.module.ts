import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { ComumModule } from '../../../modules/comum.module'


@NgModule({
  declarations: [DepartamentoComponent],
  imports: [
    CommonModule,
    ComumModule,
    DepartamentoRoutingModule,
    ReactiveFormsModule
  ]
})
export class DepartamentoModule { }
