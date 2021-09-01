import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { FilterDepartamentoPipe } from 'src/app/pipes/filter-departamento.pipe';

@NgModule({
  declarations: [FuncionarioComponent, FilterDepartamentoPipe],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    ComumModule,
  ],
})
export class FuncionarioModule {}
