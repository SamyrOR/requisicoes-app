import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Movimentacao, Requisicao } from 'src/app/models/requisicao.model';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css'],
})
export class MovimentacaoComponent implements OnInit {
  @Input() funcionarioLogado!: Funcionario;
  requisicoes$!: Observable<Requisicao[]>;
  movimentacoes!: Movimentacao[];
  requisicaoSelecionada!: Requisicao;
  edit!: boolean;
  displayDialogMovimentacao!: boolean;
  displayDialogMovimentacoes!: boolean;
  form!: FormGroup;
  listaStatus!: string[];

  constructor(
    private requisicaoService: RequisicaoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configForm();
    this.carregarStatus();
    this.listaRequisicoesDepartamento();
  }

  configForm() {
    this.form = this.fb.group({
      funcionario: ['', Validators.required],
      dataHora: [''],
      status: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  carregarStatus() {
    this.listaStatus = [
      'Aberto',
      'Pendente',
      'Processando',
      'Não autorizada',
      'Finalizado',
    ];
  }
  listaRequisicoesDepartamento() {
    this.requisicoes$ = this.requisicaoService
      .list()
      .pipe(
        map((reqs: Requisicao[]) =>
          reqs.filter(
            (r) => r.destino.nome === this.funcionarioLogado.departamento.nome
          )
        )
      );
  }

  setValorPadrao() {
    this.form.patchValue({
      funcionario: this.funcionarioLogado,
      dataHora: new Date(),
    });
    this.movimentacoes = [];
  }

  add(requisicao: Requisicao) {
    this.form.reset();
    this.edit = false;
    this.setValorPadrao();
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = !requisicao.movimentacoes
      ? []
      : requisicao.movimentacoes;
    this.displayDialogMovimentacao = true;
  }

  save() {
    this.movimentacoes.push(this.form.value);
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService
      .createOrUpdate(this.requisicaoSelecionada)
      ?.then(() => {
        this.displayDialogMovimentacao = false;
        Swal.fire(
          `Requisição ${!this.edit ? 'salva' : 'atualizada'} com sucesso.`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogMovimentacao = true;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} a Requisição.`,
          `Detalhes: ${erro}`,
          'error'
        );
      });
    this.form.reset();
  }

  onDialogClose(event: any) {
    this.displayDialogMovimentacoes = event;
  }

  verMovimentacoes(requisicao: Requisicao) {
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = requisicao.movimentacoes;
    this.displayDialogMovimentacoes = true;
  }
  delete(requisicao: Requisicao) {
    Swal.fire({
      title: 'Confirma a exclusão da Requisição?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.requisicaoService.delete(requisicao.id).then(() => {
          Swal.fire('RequisiÇão excluida com sucesso', '', 'success');
        });
      }
    });
  }
}
