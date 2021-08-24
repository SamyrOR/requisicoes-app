import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { MovimentacaoComponent } from './movimentacao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [MovimentacaoComponent],
  imports: [
    CommonModule,
    MovimentacaoRoutingModule,
    ReactiveFormsModule,
    ComumModule,
    NgSelectModule,
  ],
  exports: [MovimentacaoComponent],
})
export class MovimentacaoModule {}
