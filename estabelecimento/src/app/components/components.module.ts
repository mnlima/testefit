import { TabelaComponent } from './tabela/tabela.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

@NgModule({
  declarations: [
    TabelaComponent,
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    TabelaComponent,
  ]
  
})
export class ComponentsModule { }
