import { CardComponent } from './card/card.component';
import { TabelaComponent } from './tabela/tabela.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TabelaComponent,
    CardComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    TabelaComponent,
    CardComponent
  ]
})
export class ComponentsModule { }
