import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import * as moment from 'moment';

import { UFModel } from 'src/app/utils/uf.utils';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { DisplayedColumnsModel } from './../../components/tabela/tabela.component';
import { CNPJvalidator } from 'src/app/utils/cnpj.validator.utils';
import { DateValidator } from 'src/app/utils/date.validator.utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';

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
    { label: 'CNPJ', field: 'cnpj' },
    { label: 'Razão Social', field: 'razaoSocial' },
    { label: 'Endereco', field: 'endereco' },
    { label: 'Categoria', field: 'categoria' },
    { label: 'Status', field: 'status' },
  ];

  modalTitle = [
    { label: 'Razão Social', field: 'razaoSocial' },
    { label: 'Nome Fantasia', field: 'nomeFantasia' },
    { label: 'CNPJ', field: 'cnpj' },
    { label: 'E-mail', field: 'email' },
    { label: 'Endereco', field: 'endereco' },
    { label: 'Cidade', field: 'cidade' },
    { label: 'Estado', field: 'estado' },
    { label: 'Telefone', field: 'telefone' },
    { label: 'Data de Cadastro', field: 'dataCadastro' },
    { label: 'Categoria', field: 'categoria' },
    { label: 'Status', field: 'status' },
    { label: 'Agencia', field: 'agencia' },
    { label: 'Conta', field: 'conta' },
  ]

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
    private _toastService: ToastrService,
    private _modalService: NgbModal
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
      res.map(item => {
        item.status = item.status ? 'Ativo' : 'Inativo';
      })
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
        this.resetForm();
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

  onView(row) {

    const modalRef = this._modalService.open(ModalComponent);

    modalRef.componentInstance.name = 'Estabelecimento';
    modalRef.componentInstance.title = 'Estabelecimento';
    modalRef.componentInstance.keys = this.modalTitle;
    modalRef.componentInstance.data = row;
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

  resetForm() {
    let control: AbstractControl = null;
    this.estabelecimentoGroup.reset();
    this.estabelecimentoGroup.markAsUntouched();
    this.estabelecimentoGroup.markAsPristine();
    Object.keys(this.estabelecimentoGroup.controls).forEach((name) => {
      control = this.estabelecimentoGroup.controls[name];
      control.setErrors(null);
      control.setValue({});
    });
  }

}