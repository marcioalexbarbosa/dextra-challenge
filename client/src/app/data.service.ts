import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getValorLanche(lanche) {
    return this.http.get('http://localhost:3000/lanche/' + lanche)
  }
}
