import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComumModule } from '../../../modules/comum/comum.module';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { FilterDepartamentoPipe } from '../../../pipes/filter-departamento.pipe';

@NgModule({
  declarations: [FuncionarioComponent, FilterDepartamentoPipe],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    NgSelectModule,
    ComumModule,
  ]
})
export class FuncionarioModule { }
