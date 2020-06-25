import { NgModule } from '@angular/core';

import { ListaRoutingModule } from './lista-routing.module';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [],
  imports: [
    ListaRoutingModule,
    ComumModule,
    NgSelectModule
  ]
})
export class ListaModule { }
