import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EstabelecimentoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
