import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { FilterDepartamentoPipe } from '../../../pipes/filter-departamento.pipe';
import { ComumModule } from '../../../modules/comum.module'
 
@NgModule({
  declarations: [FuncionarioComponent, FilterDepartamentoPipe],
  imports: [
    ComumModule,
    CommonModule,
    FuncionarioRoutingModule,
    NgSelectModule,
  ]
})
export class FuncionarioModule { }
