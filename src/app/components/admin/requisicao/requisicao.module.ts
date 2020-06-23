import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { MovimentacaoComponent } from '../movimentacao/movimentacao.component'


@NgModule({
  declarations: [RequisicaoComponent, MovimentacaoComponent],
  imports: [
    CommonModule,
    RequisicaoRoutingModule,
    ComumModule,
    NgSelectModule
  ]
})
export class RequisicaoModule { }
