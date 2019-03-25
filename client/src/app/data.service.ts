import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getValorLanche(lanche) {
    return this.http.get(this.apiUrl + '/lanche/' + lanche)
  }

  getLanches() {
    return this.http.get(this.apiUrl + '/lanche')
  }

  getIngredientes() {
    return this.http.get(this.apiUrl + '/ingrediente')
  }

  getValorLancheComIngredientes(lanche, extras) {
    return this.http.post(this.apiUrl + '/lanche/' + lanche, {extra: extras});
  }

}
