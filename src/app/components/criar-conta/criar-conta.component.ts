import { GeralService } from './../../services/geral.service';
import { CriarConta } from '../../models/criar-conta-model';
import { SalvarClienteService } from '../../services/salvar-cliente.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss'],
})
export class CriarContaComponent implements OnInit {
  form: FormGroup;
  error = 'Este campo é obrigatório!';
  clientes: CriarConta[];
  loading = this.geralService.loading;

  constructor(
    private formBuilder: FormBuilder,
    private SalvarClienteService: SalvarClienteService,
    private snackBar: MatSnackBar,
    private router: Router,
    private geralService: GeralService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]),
      confirmacaoSenha: new FormControl('', [Validators.required]),
    });

    this.SalvarClienteService.lerClientes().subscribe({
      next: (clientes: CriarConta[]) => {
        this.clientes = clientes;
      },
      error: () => {
        this.alertaDados('falha');
      },
    });
  }

  salvarDadosCliente() {
    this.geralService.showLoading();

    const id = this.clientes[this.clientes.length - 1].id + 1;
    const nome = this.form.controls['nome'].value;
    const email = this.form.controls['email'].value;
    const senha = this.form.controls['senha'].value;

    const cliente: CriarConta = { id, nome: nome, email: email, senha: senha };

    this.SalvarClienteService.salvarCliente(cliente).subscribe({
      next: () => {
        this.geralService.hideLoading();
        this.alertaDados('sucesso');
        this.router.navigateByUrl('login');
      },
      error: () => {
        this.geralService.hideLoading();
        this.alertaDados('falha');
      },
    });
  }

  alertaDados(tipoExecucao: String) {
    switch (tipoExecucao) {
      case 'sucesso':
        this.snackBar.open('Conta criada com sucesso.', undefined, {
          duration: 2000,
          panelClass: 'snackbar-tema',
        });
        break;
      case 'falha':
        this.snackBar.open(
          'Serviço indisponível no momento, tente novamente mais tarde.',
          undefined,
          {
            duration: 2000,
            panelClass: 'snackbar-tema',
          }
        );
        break;
    }
  }

  validaEmail(): String {
    if (this.form.controls['email'].hasError('required')) {
      return this.error;
    }
    return this.form.controls['email'].hasError('email')
      ? 'E-mail inválido'
      : '';
  }
  validaSenhas(): string {
    if (
      this.form.controls['senha'].value !==
      this.form.controls['confirmacaoSenha'].value
    ) {
      this.form.controls['confirmacaoSenha'].setErrors({
        camposDivergentes: true,
      });
    }

    return this.form.controls['confirmacaoSenha'].hasError('camposDivergentes')
      ? 'As senhas devem ser iguais'
      : '';
  }
}
