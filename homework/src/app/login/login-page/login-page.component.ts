import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { KeyPressService } from 'src/app/service/key-press.service';
import { AppFetchService } from 'src/app/utils/fetch/app.fetch';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService]
})
export class LoginPageComponent implements OnInit {

  private minPasswordLong: number = 8;
  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  }, [
    this.keyPressService.PatternLengthValidator('password', this.minPasswordLong),
    this.keyPressService.PatternUpperValidator('password'),
    this.keyPressService.PatternLowerValidator('password'),
    this.keyPressService.PatternNumericValidator('password'),
    this.keyPressService.PatternSpecialValidator('password')
  ]);

  public processingText: string = "PROCESSING";
  public processingCount: number = 0;

  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    public authService: AuthService,
    private keyPressService: KeyPressService,
    private appFetchService: AppFetchService
  ) { }

  ngOnInit(): void {
    this.InitPublicKey();
    this.authService.CheckIfSignedin();
    this.primengConfig.ripple = true;
    setTimeout(() => {
      this.ShowCookie();
    });
    
    setInterval(() => {
      if(this.authService.isSigningIn) {
        this.processingCount = (this.processingCount + 1) % 4;
        let dots = "";
        for (let i = 0; i < this.processingCount; i++) {
          dots += ".";
        }
        this.processingText = "PROCESSING" + dots;
      }
      else {
        this.processingText = "PROCESSING";
        this.processingCount = 0;
      }
    }, 500);
  }

  private InitPublicKey(): void {
    // this.appFetchService.getPublicKey().subscribe(res => {
    // });
  }

  public Login(): void {
    let usr = this.loginForm.get("username")?.value;
    let pwd = this.loginForm.get("password")?.value;
    this.VerifyAndRedirect(`${usr}`, `${pwd}`);
  }

  private VerifyAndRedirect(usr: string, pwd: string): void {
    if (usr == "admin" && pwd == "1234") {
      this.authService.AdminSignin();
    }
    else {
      this.authService.Signin({
        usr: usr,
        role: usr,
        token: `bearer ${usr}`,
        pwd: pwd
      });
    }

  }

  public ShowCookie(): void {
    this.messageService.clear();
    this.messageService.add({ key: 'cookie', sticky: true, severity: 'info', summary: 'Allow Cookies', detail: 'By using this website, you automatically accept all cookies that we are using.' });
  }

  public onCloseCookie(): void {
    this.messageService.clear();
  }

  public onConfirmCookie(): void {
    this.messageService.clear('cookie');
  }

  public onCustomizeCookie(): void {
    this.messageService.clear('cookie');
    this.messageService.add({ key: 'customizeCookie', sticky: true, severity: 'info', summary: 'Customize Cookies', detail: 'This function is under constructing.' });
  }

  public get patternLengthError(): boolean {
    return (
      this.loginForm.getError('mismatchLength')
    );
  }

  public get patternUpperError(): boolean {
    return (
      this.loginForm.getError('mismatchUpper')
    );
  }

  public get patternLowerError(): boolean {
    return (
      this.loginForm.getError('mismatchLower')
    );
  }

  public get patternNumericError(): boolean {
    return (
      this.loginForm.getError('mismatchNumeric')
    );
  }

  public get patternSpecialError(): boolean {
    return (
      this.loginForm.getError('mismatchSpecial')
    );
  }

  public onKeyPressInput(event: any) {
    this.authService.isFailedSignIn = false;
    return this.keyPressService.keyPressNotThai(event);
  }

}
