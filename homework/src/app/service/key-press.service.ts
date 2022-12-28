import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class KeyPressService {

  constructor() { }

  public keyPressNotThai(event: any): boolean {
    return !(event.charCode >= 3585 && event.charCode <= 3660);
  }

  public keyPressOnlyNumber(event: any): boolean {
    return (/^\d$/.test(event.key));
  }

  public keyPressAccount(event: any): boolean {
    return (/^\d$|^\.$/.test(event.key));
  }

  public isStringLengthEqualTo(event: any, length: number): boolean {
    return event.target.value.length == length;
  }

  public isStringLengthLessOrEqualTo(event: any, length: number): boolean {
    return event.target.value.length <= length;
  }

  public transformNumericToAccount(event: any): string {
    let account = event.target.value;
    /*-------------------add 2 decimal------------------------*/
    if (/^\d+\.{1}\d{0,2}$/.test(account)) {
      let satang = account.split(".")[1];
      for (let i = satang.length; i < 2; i++) {
        account += "0";
      }
    }
    else if (/^\d+\.{1}\d{3,}$/.test(account)) {
      let satang = account.split(".")[1];
      if (parseInt(satang.charAt(2)) >= 5) {
        account = account.split(".")[0] + "." + (parseInt(
          (account.split(".")[1].match(/^\d{2}/)[0])
        ) + 1).toString();
      }
      else {
        account = account.split(".")[0] + "." + account.split(".")[1].match(/^\d{2}/)[0];
      }
    }
    else if (/^\d+$/.test(account)) {
      account += ".00"
    }
    /*---------------------------------------------------------*/
    /*---------------------remove 0----------------------------*/
    for (; account.length > 0;) {
      if (account[0] == "0") {
        account = account.slice(1);
      }
      else break;
    }
    /*---------------------------------------------------------*/
    /*---------------------add comma---------------------------*/
    account = account.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    /*---------------------------------------------------------*/
    return account;
  }

  public transformAccountToNumeric(event: any, value?: string): string {
    let account = value ? value : event.target.value;
    if (/^(\d|\,)+\.00$/.test(account)) {
      account = account.split(".")[0];
    }
    /*--------------------remove comma-------------------------*/
    let split_account = account.split(",");
    let newAccount = "";
    split_account.forEach((sp: string) => {
      newAccount += sp;
    });
    /*---------------------------------------------------------*/
    return newAccount;
  }

  public PatternLengthValidator(source: string, minLong: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceControl = control.get(source);
      return sourceControl && sourceControl.value.length < minLong ? { mismatchLength: true } : null;
    }
  }

  public PatternUpperValidator(source: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceControl = control.get(source);
      let pattern = /[A-Z]/g;
      return sourceControl && !pattern.test(sourceControl.value) ? { mismatchUpper: true } : null;
    }
  }

  public PatternLowerValidator(source: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceControl = control.get(source);
      let pattern = /[a-z]/g;
      return sourceControl && !pattern.test(sourceControl.value) ? { mismatchLower: true } : null;
    }
  }

  public PatternNumericValidator(source: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceControl = control.get(source);
      let pattern = /[0-9]/g;
      return sourceControl && !pattern.test(sourceControl.value) ? { mismatchNumeric: true } : null;
    }
  }

  public PatternSpecialValidator(source: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceControl = control.get(source);
      let pattern = /[!@#$%^&*()+=;,/.?:{}|<>\-\[\]]/g;
      return sourceControl && !pattern.test(sourceControl.value) ? { mismatchSpecial: true } : null;
    }
  }

  public PatternOnlyNumericValidator(source: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceControl = control.get(source);
      let pattern = /^\d+$/g;
      return sourceControl && !pattern.test(sourceControl.value) ? { notOnlyNumeric: true } : null;
    }
  }

  public PatternEmailValidator(source: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceControl = control.get(source);
      let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return sourceControl && !pattern.test(sourceControl.value) ? { notEmail: true } : null;
    }
  }

  public PatternAccountValidator(source: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceControl = control.get(source);
      let pattern = /^\d+((\.{1}\d{0,})|())$/g;
      return sourceControl && !pattern.test(sourceControl?.value) ? { notAccount: true } : null;
    }
  }
}
