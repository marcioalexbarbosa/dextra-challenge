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

  getLanches() {
    return this.http.get('http://localhost:3000/lanche')
  }

  getValorLancheComIngredientes(lanche, extras) {
    return this.http.post('http://localhost:3000/lanche/' + lanche, {extra: extras});
  }

}
