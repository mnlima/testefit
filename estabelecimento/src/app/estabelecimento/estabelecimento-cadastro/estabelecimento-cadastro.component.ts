import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { UFModel } from 'src/app/utils/uf.utils';
import { DisplayedColumnsModel } from './../../components/tabela/tabela.component';

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

  displayedColumns: DisplayedColumnsModel[] = [
    { label: 'Razão Social', field: 'razaoSocial' },
    { label: 'Nome Fantasia', field: 'nomeFantasia' },
    { label: 'E-mail', field: 'email' },
    { label: 'Endereco', field: 'endereco' },
    { label: 'Categoria', field: 'categoria' },
    { label: 'Status', field: 'status' },
  ];

  UFList = [];
  estabelecimentoGroup: FormGroup;
  dataList = [];

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
        razaoSocial: ['', Validators.required],
        nomeFantasia: [''],
        cnpj: ['', Validators.required],
        email: [''],
        endereco: [''],
        cidade: [''],
        estado: [''],
        telefone: [''],
        dataCadastro: [''],
        categoria: [''],
        status: [''],
        agencia: [''],
        conta: ['']
      }
    )
  }

  onCadastrar() {
    if (!this.estabelecimentoGroup.valid) {
      return;
    }
    
    this.estabelecimentoService.insert(this.estabelecimentoGroup.value).then(res => {
      console.log(res)
      this.dataList = [...this.dataList, ...[res]];
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
