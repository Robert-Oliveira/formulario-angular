import { GeralService } from './../../services/geral.service';
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
    private geralService: GeralService
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
    for (let cliente of this.clientes) {
      if (cliente.email === this.form.controls['email'].value)
        console.log('iguais');
    }
  }

  alertaSnackBar(tipoAlerta: String) {
    switch (tipoAlerta) {
      case 'sistemaIndisponivel':
        this.snackBar.open('Sistema temporariamente indisponível', undefined, {
          panelClass: ['snackbar-tema'],
        });
        break;

      default:
        break;
    }
  }
}
