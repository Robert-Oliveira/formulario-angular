import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss'],
})
export class CriarContaComponent implements OnInit {
  form: FormGroup;
  error = 'Este campo é obrigatório!';
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    let nome: string;
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]),
      confirmacaoSenha: new FormControl('', [Validators.required]),
    });
  }

  salvarDadosCliente() {
    console.log('clicou!');
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

  // validaSenha(): String {
  //   if (
  //     this.form.controls['senha'].value !==
  //     this.form.controls['confirmacaoSenha'].value
  //   ) {
  //     this.form.controls['confirmacaoSenha'].setErrors({
  //       CamposDivergentes: true,
  //     });
  //   }

  //   return this.form.controls['confirmacaoSenha'].hasError('camposDivergentes')
  //     ? 'As senhas devem ser iguais!'
  //     : '';
  // }
}
