import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { ComumModule } from 'src/app/modules/comum.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgSelectModule,
    MovimentacaoRoutingModule,
    ComumModule,
    
  ]
})
export class MovimentacaoModule { }
