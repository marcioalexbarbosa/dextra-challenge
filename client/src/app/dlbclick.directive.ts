import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDlbclick]'
})
export class DlbclickDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.srcElement.setAttribute('disabled', true);
    setTimeout(function(){ 
      event.srcElement.removeAttribute('disabled');
    }, 1500);
  }

}
