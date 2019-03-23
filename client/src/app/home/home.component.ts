import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  lanches = [
    {name: 'x-bacon', value: 'x-bacon'},
    {name: 'x-burguer', value: 'x-burguer'},
    {name: 'x-egg', value: 'x-egg'},
    {name: 'x-egg-bacon', value: 'x-egg-bacon'}
  ];

  selectedOption: string

  valor: Object

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  onChange(newValue) {
    this.selectedOption = newValue;
    this.data.getValorLanche(this.selectedOption).subscribe(data => {
      this.valor = data;
      console.log(this.valor);
    }
  );
}

}
