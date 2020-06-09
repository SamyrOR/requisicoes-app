import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Funcionario } from '../models/funcionario.model';
import { ServiceFirebase } from '../core/iservicefirebase.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends ServiceFirebase<Funcionario> {

  constructor(firestore: AngularFirestore) {
    super(Funcionario, firestore, 'funcionarios');
   }
}
