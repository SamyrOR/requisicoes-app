import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators'
import { Observable, pipe } from 'rxjs';
import { Requisicao } from 'src/app/models/requisicao.model';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import  Swal  from 'sweetalert2'

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

  constructor(
    private requisicaoService: RequisicaoService,
    private departamentoService: DepartamentoService,
    private auth: AuthenticationService,
    private funcionarioService: FuncionarioService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.departamentos$ = this.departamentoService.list();
    this.configForm();
    this.recuperaFuncionario();
  }

  async recuperaFuncionario() {
    await this.auth.authUser()
    .subscribe(dados => {
      this.funcionarioService.getFuncionarioLogado(dados.email)
      .subscribe(funcionarios => {
        this.funcionarioLogado = funcionarios[0];
        this.requisicoes$ = this.requisicaoService.list()
        .pipe(
          map((reqs: Requisicao[]) => reqs.filter(r => r.solicitante.email === this.funcionarioLogado.email))
        )
      })
    })
  }
  

  configForm () {
    this.form = this.fb.group({
      id: new FormControl(),
      destino: new FormControl('', Validators.required),
      solicitante: new FormControl(''),
      dataAbertura: new FormControl(''),
      ultimaAtualizacao: new FormControl(''),
      status: new FormControl(''),
      descricao: new FormControl('', Validators.required)
    })
  }

  setValorPadrao() {
    this.form.patchValue({
      solicitante: this.funcionarioLogado,
      status: 'aberto',
      dataAbertura: new Date(),
      ultimaAtualizacao: new Date()
    })
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogRequisicao = true;
    this.setValorPadrao();
  }

  save() {
    this.requisicaoService.createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogRequisicao = false;
        Swal.fire(`Requisição ${!this.edit ? 'salva' : 'atualizada'} com sucesso.`, '','success' )
      })
      .catch((erro) => {
        this.displayDialogRequisicao = false;
        Swal.fire(`Erro ao ${!this.edit ? 'salvo' : 'atualizado'} o departamento.`, `Detalhes: ${erro}`,'error')
      })
      this.form.reset()
  }

  delete(requisicao: Requisicao) {
    Swal.fire({
      title: 'Deseja realmente excluir esta requisição?',
      text:"",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value){
      this.requisicaoService.delete(requisicao.id)
        .then(()=> {
          Swal.fire('Requisição excluída com sucesso!','','success')
        })
      }
    })
  }

  selecionaRequisicao(requisicao: Requisicao) {
    this.edit = true;
    this.displayDialogRequisicao = true;
    this.form.setValue(requisicao)
  }

 

}

