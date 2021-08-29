import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Movimentacao, Requisicao } from 'src/app/models/requisicao.model';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  @Input() movimentacoes!: Movimentacao[];
  @Input() requisicaoSelecionada!: Requisicao;
  @Input() displayDialogMovimentacoes!: boolean;
  @Input() funcionarioLogado!: Funcionario;
  @Output() displayChange = new EventEmitter();

  listaStatus!: string[];
  displayDialogMovimentacao!: boolean;
  form!: FormGroup;
  edit!: boolean;
  indexMovimentacoes!: number;

  constructor(
    private requisicaoService: RequisicaoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configForm();
    this.carregaStatus();
  }

  configForm() {
    this.form = this.fb.group({
      funcionario: ['', Validators.required],
      dataHora: [''],
      status: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  carregaStatus() {
    this.listaStatus = [
      'Aberto',
      'Pendente',
      'Processando',
      'Não autorizada',
      'Finalizado',
    ];
  }

  selecionaMovimento(mov: Movimentacao, index: number) {
    this.edit = true;
    this.displayDialogMovimentacao = true;
    this.form.setValue(mov);
    this.indexMovimentacoes = index;
  }

  onClose() {
    this.displayChange.emit(false);
  }

  update() {
    this.movimentacoes[this.indexMovimentacoes] = this.form.value;
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService
      .createOrUpdate(this.requisicaoSelecionada)
      ?.then(() => {
        this.displayDialogMovimentacao = false;
        Swal.fire(
          `Movimentação ${!this.edit ? 'salva' : 'atualizada'} com sucesso.`,
          '',
          'success'
        );
        this.onClose();
      })
      .catch((erro) => {
        this.displayDialogMovimentacao = true;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} a movimentação.`,
          `Detalhes ${erro}`,
          'error'
        );
      });
    this.form.reset();
  }

  private remove<T>(array: T[], element: any) {
    return array.filter((el) => el !== element);
  }

  delete(mov: Movimentacao) {
    const movs = this.remove(this.movimentacoes, mov);
    Swal.fire({
      title: 'Confirma a exclusão da movimentação?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.requisicaoSelecionada.movimentacoes = movs;
        this.requisicaoService
          .createOrUpdate(this.requisicaoSelecionada)
          ?.then(() =>
            Swal.fire('Movimentação excluída com sucesso!', '', 'success')
          );
        this.movimentacoes = movs;
      }
    });
  }
}
