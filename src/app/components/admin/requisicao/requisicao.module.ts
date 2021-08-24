import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MovimentacaoModule } from '../movimentacao/movimentacao.module';

@NgModule({
  declarations: [RequisicaoComponent],
  imports: [
    CommonModule,
    RequisicaoRoutingModule,
    NgSelectModule,
    ComumModule,
    ReactiveFormsModule,
    MovimentacaoModule,
  ],
})
export class RequisicaoModule {}
