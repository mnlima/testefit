import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';

import { ComponentsModule } from './../components/components.module';
import { EstabelecimentoCadastroComponent } from './estabelecimento-cadastro/estabelecimento-cadastro.component';
 


@NgModule({
  declarations: [
    EstabelecimentoCadastroComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot()
  ],
  exports: [
    EstabelecimentoCadastroComponent,
  ]
})
export class EstabelecimentoModule { }
