import { Injectable } from '@angular/core';
import { SessionStore } from '../utils/session/session.store';
import { SessionQuery } from '../utils/session/session.query';
import '../utils/constant/user';
import { Routing } from '../utils/constant/routing';
import { ReqAuthenLogin } from '../utils/constant/api';
import { HttpHeaderFactory } from '../utils/fetch/core/header';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RSAEncryptService } from './rsa-encrypted.service';
import { RedirectService } from './redirect.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isSigningIn: boolean = false;
  public isFailedSignIn: boolean = false;

  constructor(
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
    private http: HttpClient,
    private rsa: RSAEncryptService,
    private redirectService: RedirectService
  ) { }

  public RequiredSigninPage(): void {
    if (!this.sessionQuery.isLoggedIn) {
      this.redirectService.ToSignIn();
    }
  }

  public CheckIfSignedin(): void {
    if (this.sessionQuery.isLoggedIn) {
      this.redirectService.ToHome();
    }
  }

  public IsSignedIn() : boolean {
    return this.sessionQuery.isLoggedIn;
  }

  public AdminSignin(): void {
    this.isSigningIn = true;
    let uuid = self.crypto.randomUUID()
    this.sessionStore.update(() => ({
      usr: "admin",
      role: "admin",
      uuid: uuid
    }));
    this.CreateJwtToken(uuid).subscribe((jwtData: any) => {
      this.sessionStore.update(() => ({
          token: jwtData.token
      }));
      let userDataSubscription = this.sessionQuery.getUserData().subscribe((data: any) => {
        console.log("Log in success!!", data);
        this.isSigningIn = false;
      });
      setTimeout(() => {
        userDataSubscription.unsubscribe();
      }, 1000);
    });
    
    this.redirectService.ToHome();
  }

  private CreateJwtToken(uuid: string): any {
    let data = {
      uuid: uuid
    }
    return this.http.post<any>(`${Routing.API.Backend.Host}${Routing.API.Backend.Sub.jwt}`, data, {});
  }

  public Signin(usrdata: User): void {
    this.isSigningIn = true;

    const pathName = Routing.API.Authen.Login;
    const data: ReqAuthenLogin = {
      headerReq: HttpHeaderFactory.getRegularHeaderReq(),
      content: {
        appId: '',
        uuId: self.crypto.randomUUID(),
        email: usrdata.usr.trim(),
        password: this.rsa.publicEncrypt(usrdata.pwd)
      }
    };

    this.http.post<any>(`${environment.apiService.host}${pathName}`, data, {}).subscribe(
      {
        next: (res) => {
          this.sessionStore.update(() => ({
            usr: usrdata.usr,
            role: usrdata.role,
            token: usrdata.token,
            pwd: usrdata.pwd
          }));
          // console.log("complete : ", res);
        },
        error: (err) => {
          console.log("error : ", err);
          this.isSigningIn = false;
          this.isFailedSignIn = true;
        },
        complete: () => {
          this.isSigningIn = false;
          this.redirectService.ToHome();
        }
      }
    );
  }

  public Signout(): void {
    this.sessionStore.reset();
    this.redirectService.ToSignIn();
  }
}
