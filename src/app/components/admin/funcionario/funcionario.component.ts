import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model';
import { Funcionario } from 'src/app/models/funcionario.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
})
export class FuncionarioComponent implements OnInit {
  funcionarios$!: Observable<Funcionario[]>;
  departamentos$!: Observable<Departamento[]>;
  departamentoFiltro!: string;
  edit!: boolean;
  displayDialogFuncionario!: boolean;
  form!: FormGroup;

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.funcionarios$ = this.funcionarioService.list();
    this.departamentos$ = this.departamentoService.list();
    this.departamentoFiltro = 'TODOS';
    this.configForm();
  }

  configForm() {
    this.form = this.fb.group({
      id: [],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      funcao: [''],
      departamento: ['', Validators.required],
    });
  }
  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogFuncionario = true;
  }

  selecionaFuncionario(funcionario: Funcionario) {
    this.edit = true;
    this.displayDialogFuncionario = true;
    this.form.setValue(funcionario);
  }

  save() {
    this.funcionarioService
      .createOrUpdate(this.form.value)
      ?.then(() => {
        this.displayDialogFuncionario = false;
        Swal.fire(
          `Funcionario ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`,
          '',
          'success'
        );
      })
      .catch((erro) => {
        this.displayDialogFuncionario = false;
        Swal.fire(
          `Erro ao ${!this.edit ? 'salvar' : 'atualizar'} o funcionario.`,
          `Detalhes:${erro}`,
          'error'
        );
      });
    this.form.reset();
  }

  delete(funcionario: Funcionario) {
    Swal.fire({
      title: 'Confirm a exclusão do funcionario?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        this.funcionarioService.delete(funcionario.id).then(() => {
          Swal.fire('Funcionario excluído com sucesso', '', 'success');
        });
      }
    });
  }
}
