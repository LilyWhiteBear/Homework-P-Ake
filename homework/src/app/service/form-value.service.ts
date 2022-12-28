import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KeyPressService } from './key-press.service';

@Injectable({
  providedIn: 'root'
})
export class FormValueService {

  public cidValue: string = "";
  public emailValue: string = "";
  public accountValue: string = "";
  public otpLength: number = 5;
  public otpValue: Array<string> = new Array<string>(this.otpLength);

  public validateForm = new FormGroup({
    cid: new FormControl(''),
    email: new FormControl(''),
    account: new FormControl(''),
  }, [
    this.keyPressService.PatternLengthValidator('cid', 13),
    this.keyPressService.PatternOnlyNumericValidator('cid'),
    this.keyPressService.PatternEmailValidator('email'),
    this.keyPressService.PatternAccountValidator('account')
  ]);

  constructor(
    private keyPressService: KeyPressService,
  ) { }

  public get patternCidError(): boolean {
    return (this.validateForm.getError('notOnlyNumeric') || this.validateForm.getError('mismatchLength')) && this.validateForm.get('cid')?.touched;
  }

  public get patternEmailError(): boolean {
    return this.validateForm.getError('notEmail') && this.validateForm.get('email')?.touched;
  }

  public get patternAccountError(): boolean {
    return this.validateForm.getError('notAccount') && this.validateForm.get('account')?.touched;
  }

  public changeAccount(value: string): void {
    this.accountValue = value;
  }

  public get CanPersonalNext() {
    return !this.patternCidError && !this.patternEmailError &&
    (this.validateForm.get('cid')?.touched && this.validateForm.get('email')?.touched);
  }

  public get CanPaymentNext() {
    return !this.patternAccountError && this.validateForm.get('account')?.touched;
  }

  public get CanSubmit() {
    let flag = this.CanPersonalNext && this.CanPaymentNext;
    for(let i = 0; i < this.otpLength; i++) {
      if(!this.otpValue[i]) return false;
    }
    return flag;
  }

  public ResetForm(): void {
    this.validateForm.reset({cid: '', email: '', account: ''});
    this.cidValue = "";
    this.emailValue = "";
    this.accountValue = "";
    this.otpValue = new Array<string>(this.otpLength);
  }

}
