import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  lanches = []
  extras = []
  ingredientes = []

  selectedOption: string

  error_message: string

  valor: Object

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getLanches().subscribe(data => {
      for (var property in data) {
        if (data.hasOwnProperty(property)) {
            this.lanches.push({name: property, value: property});
        }
    }
    this.lanches.push({name: 'Escolha', value: ''}); 
    this.selectedOption = 'Escolha';   
  }, error => {
    this.error_message = 'Servidor indisponível';
  });
  this.data.getIngredientes().subscribe(data => {
    for (var property in data) {
      if (data.hasOwnProperty(property)) {
        this.ingredientes.push({nome: property, qtd: 0});
      }
    }
  }, error => {
    this.error_message = 'Servidor indisponível';
  });
  }

  limpaQuantidades() {
    this.ingredientes.forEach(ingrediente => {
      ingrediente.qtd = 0;
    })
  }

  formataValor(value) {
    let valorTemp: number = parseFloat(value);
    valorTemp = Math.round(valorTemp * 100) / 100;
    let valorStr: string = valorTemp + '';
    valorStr = parseFloat(valorStr).toFixed(2);
    return valorStr;
  }
  onChange(newValue) {
    this.selectedOption = newValue;
    this.limpaQuantidades();
    if (newValue === 'Escolha') {
      this.valor = 0;
      return;
    }
    this.error_message = '';
    this.data.getValorLanche(this.selectedOption).subscribe(data => {
      this.valor = this.formataValor(data);
    }, error => {
      this.error_message = 'Servidor indisponível';
    });
  }

  searchIngrediente(nome){
    for (var i=0; i < this.ingredientes.length; i++) {
        if (this.ingredientes[i].nome === nome) {
            return this.ingredientes[i];
        }
    }
  }

  handleClickMinus(event: Event, nome: string) {
    let ingrediente = this.searchIngrediente(nome);
    let qtd = ingrediente.qtd;
    if (this.selectedOption === 'Escolha') {
      this.error_message = 'Escolha um lanche';
      return 0;
    }
    qtd = qtd - 1;
    if (qtd < 0) {
      qtd = 0;
    }
    var index = this.extras.indexOf(nome);
    if (index > -1) {
      this.extras.splice(index, 1);
    }
    this.data.getValorLancheComIngredientes(this.selectedOption, this.extras).subscribe(data => {
      this.valor = this.formataValor(data);
    }, error => {
      this.error_message = 'Servidor indisponível';
    });
    ingrediente.qtd = qtd;
  }

  handleClickPlus(event: Event, nome: string) {
    let ingrediente = this.searchIngrediente(nome);
    let qtd = ingrediente.qtd;
    if (this.selectedOption === 'Escolha') {
      this.error_message = 'Escolha um lanche';
      return 0;
    }
    qtd = qtd + 1;
    this.extras.push(nome);
    this.data.getValorLancheComIngredientes(this.selectedOption, this.extras).subscribe(data => {
      this.valor = this.formataValor(data);
    }, error => {
      this.error_message = 'Servidor indisponível';
    });
    ingrediente.qtd = qtd;
  }

}
