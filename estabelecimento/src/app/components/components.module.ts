import { TabelaComponent } from './tabela/tabela.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TabelaComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    TabelaComponent
  ]
})
export class ComponentsModule { }
