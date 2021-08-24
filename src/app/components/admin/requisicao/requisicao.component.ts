import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Requisicao } from 'src/app/models/requisicao.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css'],
})
export class RequisicaoComponent implements OnInit {
  requisicoes$!: Observable<Requisicao[]>;
  departamentos$!: Observable<Departamento[]>;
  edit!: boolean;
  displayDialogRequisicao!: boolean;
  form!: FormGroup;
  funcionarioLogado!: Funcionario;

  constructor(
    private requisicaoService: RequisicaoService,
    private departamentoService: DepartamentoService,
    private authService: AuthenticationService,
    private funcionarioService: FuncionarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.departamentos$ = this.departamentoService.list();
    this.configForm();
    this.recuperaFuncionario();
    // this.filtraRequisicoes();
  }

  recuperaFuncionario() {
    this.authService.authUser().subscribe((dados) => {
      this.funcionarioService
        .getFuncionarioLogado(dados?.email ?? '')
        .subscribe((funcionarios) => {
          this.funcionarioLogado = funcionarios[0];
          console.log(this.funcionarioLogado.email);
          this.filtraRequisicoes();
        });
    });
  }

  filtraRequisicoes() {
    this.requisicoes$ = this.requisicaoService
      .list()
      .pipe(
        map((reqs: Requisicao[]) =>
          reqs.filter(
            (r) => r.solicitante.email === this.funcionarioLogado.email
          )
        )
      );
  }

  configForm() {
    this.form = this.fb.group({
      id: [''],
      destino: ['', Validators.required],
      solicitante: [''],
      dataAbertura: [''],
      ultimaAtualizacao: [''],
      status: [''],
      descricao: ['', Validators.required],
    });
  }

  setValorPadrao() {
    this.form.patchValue({
      solicitante: this.funcionarioLogado,
      status: 'Aberto',
      dataAbertura: new Date(),
      ultimaAtualizacao: new Date(),
    });
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogRequisicao = true;
    this.setValorPadrao();
    console.log(this.form);
  }
  selecionaRequisicao(func: Requisicao) {
    this.edit = true;
    this.displayDialogRequisicao = true;
    this.form.setValue(func);
  }

  save() {
    this.requisicaoService
      .createOrUpdate(this.form.value)
      ?.then(() => {
        this.displayDialogRequisicao = false;
        Swal.fire(
          `Requisição ${!this.edit ? 'salva' : 'atualizada'} com sucesso.`,
          '',
          'success'
        );
        this.displayDialogRequisicao = false;
      })
      .catch((erro) => {
        this.displayDialogRequisicao = true;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} a Requisição.`,
          `Detalhes: ${erro}`,
          'error'
        );
      });
    this.form.reset();
  }

  delete(depto: Requisicao) {
    Swal.fire({
      title: 'Confirma a exclusão da Requisição?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.requisicaoService.delete(depto.id).then(() => {
          Swal.fire('Requisição excluída com sucesso!', '', 'success');
        });
      }
    });
  }
}
