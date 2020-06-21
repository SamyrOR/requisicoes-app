import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { MovimentacaoComponent } from './movimentacao.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [MovimentacaoComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    MovimentacaoRoutingModule,
    ComumModule,
    
  ]
})
export class MovimentacaoModule { }
