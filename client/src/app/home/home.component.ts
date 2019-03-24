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

  qtd_alface: number = 0
  qtd_bacon: number = 0
  qtd_hamburguer: number = 0
  qtd_ovo: number = 0
  qtd_queijo: number = 0

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
  });
  }

  limpaQuantidades() {
    this.qtd_alface = 0;
    this.qtd_bacon = 0;
    this.qtd_hamburguer = 0;
    this.qtd_ovo = 0;
    this.qtd_queijo = 0;
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
    console.log('newValue', newValue);
    if (newValue === 'Escolha') {
      this.valor = 0;
      return;
    }
    this.error_message = '';
    this.data.getValorLanche(this.selectedOption).subscribe(data => {
      this.valor = this.formataValor(data);
      console.log(this.valor);
    });
  }

  handleClickMinus(qtd, nome) {
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
    console.log('extras minus', this.extras);  
    this.data.getValorLancheComIngredientes(this.selectedOption, this.extras).subscribe(data => {
      this.valor = this.formataValor(data);
      console.log(this.valor);
    });
    return qtd;
  }

  handleClickPlus(qtd, nome) {
    if (this.selectedOption === 'Escolha') {
      this.error_message = 'Escolha um lanche';
      return 0;
    }
    qtd = qtd + 1;
    this.extras.push(nome);
    console.log('extras plus', this.extras);
    this.data.getValorLancheComIngredientes(this.selectedOption, this.extras).subscribe(data => {
      this.valor = this.formataValor(data);
      console.log(this.valor);
    });
    return qtd;
  }

  handleClickAlfaceMinus(event: Event) {
    console.log('clicked alface minus');
    this.qtd_alface = this.handleClickMinus(this.qtd_alface, 'alface');
  }

  handleClickAlfacePlus(event: Event) {
    console.log('clicked alface plus');
    this.qtd_alface = this.handleClickPlus(this.qtd_alface, 'alface');
  }

  handleClickBaconMinus(event: Event) {
    console.log('clicked bacon minus');
    this.qtd_bacon = this.handleClickMinus(this.qtd_bacon, 'bacon');
  }

  handleClickBaconPlus(event: Event) {
    console.log('clicked bacon plus');
    this.qtd_bacon = this.handleClickPlus(this.qtd_bacon, 'bacon');
  }

  handleClickHamburguerMinus(event: Event) {
    console.log('clicked hamburguer minus');
    this.qtd_hamburguer = this.handleClickMinus(this.qtd_hamburguer, 'hamburguer');
  }

  handleClickHamburguerPlus(event: Event) {
    console.log('clicked hamburguer plus');
    this.qtd_hamburguer = this.handleClickPlus(this.qtd_hamburguer, 'hamburguer');
  }

  handleClickOvoMinus(event: Event) {
    console.log('clicked ovo minus');
    this.qtd_ovo = this.handleClickMinus(this.qtd_ovo, 'ovo');
  }

  handleClickOvoPlus(event: Event) {
    console.log('clicked ovo plus');
    this.qtd_ovo = this.handleClickPlus(this.qtd_ovo, 'ovo');
  }

  handleClickQueijoMinus(event: Event) {
    console.log('clicked queijo minus');
    this.qtd_queijo = this.handleClickMinus(this.qtd_queijo, 'queijo');
  }

  handleClickQueijoPlus(event: Event) {
    console.log('clicked queijo plus');
    this.qtd_queijo = this.handleClickPlus(this.qtd_queijo, 'queijo');
  }


}
