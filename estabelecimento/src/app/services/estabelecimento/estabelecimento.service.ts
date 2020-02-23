import { HttpClient } from '@angular/common/http';
import { CrudService } from './../crud/crud.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService extends CrudService<any> {

  constructor(
    protected http: HttpClient
  ) {
    super(http, environment.apiUrl);
  }
}
