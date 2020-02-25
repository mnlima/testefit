import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import * as moment from 'moment';

import { UFModel } from 'src/app/utils/uf.utils';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { DisplayedColumnsModel } from './../../components/tabela/tabela.component';
import { CNPJvalidator } from 'src/app/utils/cnpj.validator.utils';
import { DateValidator } from 'src/app/utils/date.validator.utils';

@Component({
  selector: 'fit-estab-cadastro',
  templateUrl: './estabelecimento-cadastro.component.html',
  styleUrls: ['./estabelecimento-cadastro.component.scss']
})
export class EstabelecimentoCadastroComponent implements OnInit {

  categoriaOptions = [
    { name: 'Supermercado' },
    { name: 'Restaurante' },
    { name: 'Borracharia' },
    { name: 'Posto' },
    { name: 'Oficina' }
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
  validInput = {
    email: false,
    telefone: false,
    razaoSocial: false,
    requiredCnpj: false,
    incorrectCnpj: false,
    incorrectDate: false,
  };
  setError: string = '';
  id: any;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private _estabelecimentoService: EstabelecimentoService,
    public _toastService: ToastrService
  ) {
    this.createForm()
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.setUFList();
    this.getEstabelecimentos();
  }

  createForm() {
    this.estabelecimentoGroup = this.fb.group(
      {
        razaoSocial: ['', Validators.required],
        nomeFantasia: [''],
        cnpj: new FormControl('', {
          validators: [Validators.required, CNPJvalidator('CPF_CNPJ')]
        }),
        email: ['', Validators.email],
        endereco: [''],
        cidade: [''],
        estado: [''],
        telefone: [''],
        dataCadastro: new FormControl('', {
          validators: [DateValidator()]
        }),
        categoria: [''],
        status: [''],
        agencia: [''],
        conta: ['']
      }
    )
  }

  getEstabelecimentos() {
    this._estabelecimentoService.list().then(res => {
      this.dataList = [...this.dataList, ...res];
    }, reject => {
      this.showToast('Erro ao consultar estabelecimentos', 'error');
    });
  }

  onCadastrar() {
    this.checkTelefone();
    if (!this.estabelecimentoGroup.valid) {
      this.checkInputIsValid();
      return;
    }
    
    let message = 'Estabelecimento cadastrado com sucesso';
    let messageError = 'Erro ao realizar cadastro';

    if (this.isEdit) {
      message = 'Estabelecimento alterado com sucesso';
      messageError = 'Erro ao alterar estabelecimento'
    }

    this._estabelecimentoService.save(this.id, this.estabelecimentoGroup.value).then((res) => {
      if (res) {
        this.getEstabelecimentos();
        this.showToast(message);
        this.isEdit = false;
        this.id = '';
      }
    }, reject => {
      this.showToast(messageError, 'error');
    }).finally(() => {

    });
  }

  onDelete(row) {
    if (row.id) {
      this._estabelecimentoService.delete(row.id).then(res => {
        this.getEstabelecimentos();
      }, reject => {
        this.showToast('Erro ao deletar estabalecimento', 'error');
      })
    }
  }

  onSelect(row) {
    this.estabelecimentoGroup.patchValue(row);
    this.isEdit = true;
    this.id = row.id;
  }

  checkTelefone() {
    let categoria = this.estabelecimentoGroup.get('categoria').value;
    let telefone = this.estabelecimentoGroup.controls['telefone']

    if (categoria == 'Supermercado' && telefone.value == '') {
      telefone.setErrors({ required: true });
    } else {
      telefone.setErrors(null);
    }
  }

  checkEmail() {
    this.setInputError('email', 'email');
  }

  checkCNPJ() {
    this.setInputError('cnpj', 'incorrect', 'incorrectCnpj');
  }

  checkDate() {
    this.setInputError('dataCadastro', 'incorrect', 'incorrectDate');
  }

  checkInputIsValid() {
    this.setError = ''
    this.setInputError('cnpj', 'required', 'requiredCnpj');
    this.setInputError('razaoSocial', 'required');
    this.setInputError('telefone', 'required');
    this.showWarning();
  }

  setInputError(input: string, error: string, validInput?: string) {
    validInput = validInput ? validInput : input;

    if (this.estabelecimentoGroup.get(input).errors &&
      this.estabelecimentoGroup.get(input).errors[error]) {
      this.validInput[validInput] = true;
      this.setError = error;
    } else {
      this.validInput[validInput] = false;
    }
  }

  showWarning() {
    let required = 'Campos obrigatórios não preenchidos';
    let incorrect = 'Campos incorretos'
    let message = this.setError == 'required' ? required : incorrect;
    this.showToast(message, 'warning', 2000);
  }

  setUFList() {
    Object.keys(UFModel).map((key) => {
      this.UFList = [...this.UFList, { id: key, name: key }];
    });
  }

  showToast(message, typeToast = 'success', timeOut = 1500) {
    if (message == '') {
      return;
    }

    this._toastService[typeToast](message, '', {
      timeOut: timeOut,
      positionClass: 'toast-top-right',
    });
  }

  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }

}