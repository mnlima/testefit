import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';

import { ComponentsModule } from './../components/components.module';
import { EstabelecimentoCadastroComponent } from './estabelecimento-cadastro/estabelecimento-cadastro.component';
import { ModalComponent } from '../components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 


@NgModule({
  declarations: [
    EstabelecimentoCadastroComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ComponentsModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot()
  ],
  exports: [
    EstabelecimentoCadastroComponent,
  ],
  entryComponents: [
    ModalComponent,
  ]
})
export class EstabelecimentoModule { }
