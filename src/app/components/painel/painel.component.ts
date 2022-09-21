import { SalvarClienteService } from './../../services/salvar-cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss'],
})
export class PainelComponent implements OnInit {
  nomeCliente: String;
  saldo: number = 1000;

  exibirSaldo: boolean = false;
  constructor(private salvarClienteService: SalvarClienteService) {}

  ngOnInit(): void {
    this.nomeCliente = this.salvarClienteService.obterClienteLogin().nome;
  }
}
