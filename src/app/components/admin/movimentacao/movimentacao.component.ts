import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Movimentacao, Requisicao } from 'src/app/models/requisicao.model';
import { RequisicaoService } from 'src/app/services/requisicao.service';

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

  add(requisicao: Requisicao) {
    this.form.reset();
    this.edit = false;
    // this.setValorPadrao();
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = !requisicao.movimentacoes
      ? []
      : requisicao.movimentacoes;
    this.displayDialogMovimentacao = true;
  }
}
