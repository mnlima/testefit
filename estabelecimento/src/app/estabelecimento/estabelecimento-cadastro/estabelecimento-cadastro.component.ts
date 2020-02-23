import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UFModel } from 'src/app/utils/uf.utils';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';

@Component({
  selector: 'fit-estab-cadastro',
  templateUrl: './estabelecimento-cadastro.component.html',
  styleUrls: ['./estabelecimento-cadastro.component.scss']
})
export class EstabelecimentoCadastroComponent implements OnInit {

  categoriaOptions = [
    { name: 'Supermercado', value: '1' },
    { name: 'Restaurante', value: '2' },
    { name: 'Borracharia', value: '3' },
    { name: 'Posto', value: '4' },
    { name: 'Oficina', value: '5' }
  ];

  statusOtions = [
    { name: 'Ativo', value: '1' },
    { name: 'Inativo', value: '0' }
  ]

  UFList = [];
  estabelecimentoGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estabelecimentoService: EstabelecimentoService
  ) {
    this.createForm()
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.setUFList();
  }

  createForm() {
    this.estabelecimentoGroup = this.fb.group(
      {
        RAZAO_SOCIAL: ['', Validators.required],
        CNPJ: ['', Validators.required],
        EMAIL: [''],
        ENDERECO: [''],
        CIDADE: [''],
        ESTADO: [''],
        TELEFONE: [''],
        DATA_CADASTRO: [''],
        CATEGORIA: [''],
        STATUS: [''],
        AGENCIA: [''],
        CONTA: ['']
      }
    )
  }

  onCadastrar() {
    debugger
    this.estabelecimentoService.insert(this.estabelecimentoGroup.value).then(res => {
    }, reject => {
      
    }).finally(() => {

    });
  }

  setUFList() {
    Object.keys(UFModel).map((key) => {
      this.UFList = [...this.UFList, { id: key, name: key }];
    });
  }

}
