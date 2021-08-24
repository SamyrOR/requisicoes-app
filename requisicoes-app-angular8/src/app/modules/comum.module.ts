import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from './primeng.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNGModule
  ],
  exports: [ 
    CommonModule,
    FormsModule,
    PrimeNGModule,
    ReactiveFormsModule
  ]
})
export class ComumModule { }