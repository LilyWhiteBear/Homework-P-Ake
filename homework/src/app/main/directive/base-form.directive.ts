import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[baseForm]'
})
export class BaseFormDirective {

  constructor() { }

  @HostListener('click', ['$event']) 
  ClickInput(event: any): any {
    event.target.classList.add("dirty");
  }
}
