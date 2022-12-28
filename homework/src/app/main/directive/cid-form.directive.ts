import { Directive, ElementRef, HostListener } from '@angular/core';
import { KeyPressService } from 'src/app/service/key-press.service';
import { BaseFormDirective } from './base-form.directive';

@Directive({
  selector: '[cidInput]'
})
export class CidFormDirective extends BaseFormDirective {

  constructor(
    private el: ElementRef,
    private keyPressService: KeyPressService
  ) {
    super();
    this.el.nativeElement.setAttribute("placeholder", "cid");
  }

  ngAfterViewInit() {
    this.el.nativeElement.setAttribute("placeholder", "Citizen ID 13 digits");
    this.el.nativeElement.setAttribute("type", "text");
    this.el.nativeElement.setAttribute("maxlength", "13");
  }

  @HostListener('keypress', ['$event']) 
  KeyPressCid(event: any): any {
    return this.keyPressService.keyPressOnlyNumber(event) && this.keyPressService.isStringLengthLessOrEqualTo(event, 13-1);
  }
}
