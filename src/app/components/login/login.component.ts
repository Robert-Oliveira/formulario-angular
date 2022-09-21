import { Router } from '@angular/router';
import { GeralService } from '../../services/geral/geral.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalvarClienteService } from './../../services/salvar-cliente.service';
import { CriarConta } from './../../models/criar-conta-model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { retryWhen } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  clientes: CriarConta[];
  loading = this.geralService.loading;

  constructor(
    private formBuilder: FormBuilder,
    private salvarClienteService: SalvarClienteService,
    private snackBar: MatSnackBar,
    private geralService: GeralService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.geralService.showLoading();
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });

    this.salvarClienteService.lerClientes().subscribe({
      next: (clientes: CriarConta[]) => {
        this.clientes = clientes;
        console.table(clientes);
        this.geralService.hideLoading();
      },
      error: () => {
        this.alertaSnackBar('sistemaIndisponivel');
        this.geralService.hideLoading();
      },
    });
  }

  realizarLogin() {
    let cliente = this.validarUsuario();

    if (!cliente) {
      this.alertaSnackBar('usuarioInexistente');
    } else {
      this.validarSenha(cliente);
    }
  }

  validarUsuario(): any {
    for (let cliente of this.clientes) {
      if (cliente.email === this.form.controls['email'].value) return cliente;
    }
    return null;
  }

  validarSenha(cliente: CriarConta) {
    if (cliente.senha === this.form.controls['senha'].value) {
      this.alertaSnackBar('loginSucesso');
      this.route.navigate(['/painel']);
      this.salvarClienteService.salvarClienteLogin(cliente);
    } else {
      this.alertaSnackBar('usuarioInexistente');
    }
  }

  alertaSnackBar(tipoAlerta: String) {
    switch (tipoAlerta) {
      case 'sistemaIndisponivel':
        this.snackBar.open('Sistema temporariamente indisponível', undefined, {
          panelClass: ['snackbar-tema'],
          duration: 2000,
        });
        break;
      case 'usuarioInexistente':
        this.snackBar.open('E-mail ou senha incorreto(s)', undefined, {
          panelClass: ['snackbar-tema'],
          duration: 2000,
        });
        break;
      case 'loginSucesso':
        this.snackBar.open('Login realizado com sucesso.', undefined, {
          panelClass: ['snackbar-tema'],
          duration: 2000,
        });
        break;
      default:
        break;
    }
  }
}
