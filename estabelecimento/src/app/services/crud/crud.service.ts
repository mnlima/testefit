import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  constructor(
    protected http: HttpClient,
    private API_URL
  ) { }

  save(record) {
    if (record['id']) {
      this.update(record['id'],record);
    } else {
      this.insert(record);
    }
  }

  insert(record) {
    return this.http.post(this.API_URL, record)
    .pipe(map(res => res))
    .toPromise();
  }

  list(record) {
    return this.http.get<T[]>(this.API_URL)
    .pipe(map(res => res))
    .toPromise();
  }

  search(id) {
    return this.http.get<T[]>(`${this.API_URL}/${id}`)
    .pipe(map(res => res))
    .toPromise();
  }

  update(id,record) {
    return this.http.put<T[]>(`${this.API_URL}/${id}`, record)
    .pipe(map(res => res))
    .toPromise();
  }

  delete(id) {
    return this.http.delete<T[]>(`${this.API_URL}/${id}`)
    .pipe(map(res => res))
    .toPromise();
  }
}
