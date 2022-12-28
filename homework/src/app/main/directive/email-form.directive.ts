import { Directive, ElementRef, HostListener } from '@angular/core';
import { KeyPressService } from 'src/app/service/key-press.service';
import { BaseFormDirective } from './base-form.directive';

@Directive({
  selector: '[emailInput]'
})
export class EmailFormDirective extends BaseFormDirective {

  constructor(
    private el: ElementRef,
    private keyPressService: KeyPressService
  ) {
    super();
    this.el.nativeElement.setAttribute("placeholder", "cid");
  }

  ngAfterViewInit() {
    this.el.nativeElement.setAttribute("placeholder", "Email address");
    this.el.nativeElement.setAttribute("type", "email");
    this.el.nativeElement.setAttribute("maxlength", "30");
  }

  @HostListener('keypress', ['$event']) 
  KeyPressCid(event: any): any {
    return this.keyPressService.keyPressNotThai(event);
  }
}
