import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { KeyPressService } from 'src/app/service/key-press.service';
import { BaseFormDirective } from './base-form.directive';

@Directive({
  selector: '[accountInput]'
})
export class AccountFormDirective extends BaseFormDirective {

  @Output() accountInput = new EventEmitter<string>();

  constructor(
    private el: ElementRef,
    private keyPressService: KeyPressService
  ) {
    super();
  }

  ngAfterViewInit() {
    this.el.nativeElement.setAttribute("placeholder", "XXX.XX");
    this.el.nativeElement.setAttribute("type", "text");
    this.el.nativeElement.setAttribute("maxlength", "20");
    this.el.nativeElement.style.flex = "1 1 auto";
  }

  @HostListener('keypress', ['$event']) 
  KeyPressNumeric(event: any): any {
    if(!this.keyPressService.isStringLengthLessOrEqualTo(event, 20-1)) {
      alert("Value can contains 20 digits at most.");
    }
    return this.keyPressService.keyPressAccount(event) && this.keyPressService.isStringLengthLessOrEqualTo(event, 20-1);
  }

  @HostListener('focusout', ['$event']) 
  TranformIntoAccount(event: any): any {
    this.accountInput.emit(this.keyPressService.transformNumericToAccount(event));
  }

  @HostListener('focus', ['$event']) 
  TranformIntoNumeric(event: any): any {
    this.accountInput.emit(this.keyPressService.transformAccountToNumeric(event));
  }

}
