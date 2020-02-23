import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstabelecimentoCadastroComponent } from './estabelecimento-cadastro/estabelecimento-cadastro.component';
import { EstabelecimentoListagemComponent } from './estabelecimento-listagem/estabelecimento-listagem.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EstabelecimentoCadastroComponent,
    EstabelecimentoListagemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    EstabelecimentoCadastroComponent,
    EstabelecimentoListagemComponent
  ]
})
export class EstabelecimentoModule { }
