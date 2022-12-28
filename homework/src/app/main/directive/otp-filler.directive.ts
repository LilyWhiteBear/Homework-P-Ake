import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormValueService } from 'src/app/service/form-value.service';
import { KeyPressService } from 'src/app/service/key-press.service';

@Directive({
  selector: '[otpFiller]'
})
export class OtpFillerDirective implements OnInit {

  @Input() otpLong: number = 5;
  private otpInputs: Array<any> = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private keyPressService: KeyPressService,
    private formValueService: FormValueService
  ) {
    
  }

  ngOnInit() {
    this.el.nativeElement.style.display = "flex";
    this.el.nativeElement.style.columnGap = "1rem";
    this.el.nativeElement.style.flex = "1 1 auto";
    this.el.nativeElement.style.justifyContent = "center";
    for(let i = 0; i < this.otpLong; i++) {
      let newOtpInput = this.renderer.createElement('input');
      newOtpInput.setAttribute("maxlength", "1");
      newOtpInput.style.width = "3rem";
      newOtpInput.style.height = "4rem";
      newOtpInput.style.textAlign = "center";
      newOtpInput.style.fontSize = "xx-large";
      if(this.formValueService.otpValue[i]) {
        newOtpInput.value = this.formValueService.otpValue[i];
      }
      this.otpInputs.push(newOtpInput);
      this.renderer.appendChild(this.el.nativeElement, newOtpInput);
    }

    for(let i = 0; i < this.otpInputs.length; i++) {
      this.renderer.listen(this.otpInputs[i], 'keypress', (event: any) => {
        return this.keyPressService.keyPressOnlyNumber(event);
      });
      this.renderer.listen(this.otpInputs[i], 'keyup', (event: any) => {
        if(event.keyCode === 8 && i > 0) {
          this.otpInputs[i - 1].focus();
        }
        else if(event.keyCode >= 48 && event.keyCode <= 57 && i + 1 < this.otpInputs.length) {
          this.otpInputs[i + 1].focus();
        }
        for(let k = 0; k < this.otpInputs.length; k++) {
          this.formValueService.otpValue[k] = this.otpInputs[k].value;
        }
      });
      this.renderer.listen(this.otpInputs[i], 'paste', (event: any) => {
        let pasteText = event.clipboardData.getData('text');
        if(/^\d+$/.test(pasteText)) {
          for(let t = 0; t < pasteText.length; t++) {
            if(t + i < this.otpInputs.length) {
              this.otpInputs[i + t].value = pasteText[t];
              this.otpInputs[i + t].focus();
            }
          }
        }
        for(let k = 0; k < this.otpInputs.length; k++) {
          this.formValueService.otpValue[k] = this.otpInputs[k].value;
        }
      });
    }
  }

}
