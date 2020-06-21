import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Requisicao, Movimentacao } from 'src/app/models/requisicao.model';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css']
})
export class MovimentacaoComponent implements OnInit {

  @Input() funcionarioLogado: Funcionario;
  requisicoes$: Observable<Requisicao[]>;
  movimentacoes: Movimentacao[];
  requisicaoSelecionada: Requisicao;
  edit: boolean;
  displayDialogMovimentacao: boolean;
  displayDialogMovimentacoes: boolean;
  form: FormGroup;
  listaStatus: string[];

  constructor(
    private requisicaoService: RequisicaoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configForm();
    this.carregaStatus();
    this.listaRequisicoesDepartamento();
  } 

  configForm(){
    this.form = this.fb.group({
      funcionario: new FormControl('', Validators.required),
      dataHora: new FormControl(''),
      status: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    })
  }

  carregaStatus() {
    this.listaStatus = [
      'Aberto',
      'Pendente',
      'Processando',
      'Não autorizada',
      'Finalizado'
    ]
  }

  setValorPadrao() {
    this.form.patchValue({
      funcionario: this.funcionarioLogado,
      dataHora: new Date()
    })
  }

  listaRequisicoesDepartamento() {
    this.requisicoes$ = this.requisicaoService.list()
    .pipe(
      map((reqs: Requisicao[]) => reqs.filter (
        r => r.destino.nome === this.funcionarioLogado.departamento.nome
      ))
    )
  }

  add(requisicao: Requisicao) {
    this.form.reset();
    this.edit = false;
    this.setValorPadrao();
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = (!requisicao.movimentacoes ? [] : requisicao.movimentacoes);
    this.displayDialogMovimentacao = true;
  }

  save(){
    this.movimentacoes.push(this.form.value);
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService.createOrUpdate(this.requisicaoSelecionada)
    .then(() => {
      this.displayDialogMovimentacao = false;
      Swal.fire(`Requisição ${!this.edit ? 'salvo' : 'atualizado'} com sucesso,'', 'success`)
    })
    .catch((erro) => {
      this.displayDialogMovimentacao = true;
      Swal.fire(`Erro ao ${!this.edit? 'salvo' : 'atualizado'} a Reqisição`, `Detalhes: ${erro}`, 'error');
      this.form.reset()
    })
  }

  delete(requisicao: Requisicao){
    Swal.fire({
      title: 'Deseja realmente excluir está Requisição?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.requisicaoService.delete(requisicao.id)
        .then(() => {
            Swal.fire('Requisição excluído com sucesso!', '', 'success')
        })
      }
    })
  }

  onDialogClose(event){
    this.displayDialogMovimentacoes = event;
  }

  verMovimentacoes(requisicao: Requisicao){
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = requisicao.movimentacoes;
    this.displayDialogMovimentacoes = true;
  }

}
