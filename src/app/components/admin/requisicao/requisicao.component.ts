import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Requisicao } from 'src/app/models/requisicao.model';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent implements OnInit {

  requisicoes$: Observable<Requisicao[]>;
  departamentos$: Observable<Departamento[]>;
  edit: boolean;
  displayDialogRequisicao: boolean;
  form: FormGroup;
  funcionarioLogado: Funcionario;

  constructor() { }

  ngOnInit(): void {
  }

}
