import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  senha!: string;
  mensagem!: string;
  emailEnviado!: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logar() {
    try {
      if (this.email == undefined || this.senha == undefined) {
        this.mensagem = 'Usuário ou senha vazios';
        return;
      }
      this.authService
        .login(this.email, this.senha)
        .then(() => {
          this.router.navigate(['admin/painel']);
        })
        .catch((erro) => {
          let detalhes = '';
          switch (erro.code) {
            case 'auth/user-not-found': {
              detalhes = 'Não exite usuário para o e-mail informado';
              break;
            }
            case 'auth/invalid-email': {
              detalhes = 'Email inválido';
              break;
            }
            case 'auth/wrong-password': {
              detalhes = 'Senha Inválida';
              break;
            }
            default: {
              detalhes = erro.message;
              break;
            }
          }
          this.mensagem = `Erro ao logar. ${detalhes}`;
        });
    } catch (erro) {
      this.mensagem = `Erro ao logar. Detalhes: ${erro}`;
    }
  }

  async enviaLink() {
    const { value: email } = await Swal.fire({
      title: 'Informe o email cadastrado',
      input: 'email',
      inputPlaceholder: 'email',
    });
    if (email) {
      this.authService
        .resetPassword(email)
        .then(() => {
          this.emailEnviado = true;
          this.mensagem = `Email com instruções para recuperação da senha enviado para ${email}`;
        })
        .catch((erro) => {
          this.mensagem = `Erro ao localizar o email. Detalhes ${erro.message}`;
        });
    }
  }
}
