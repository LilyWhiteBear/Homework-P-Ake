import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RSAEncryptService } from 'src/app/service/rsa-encrypted.service';
import { environment } from 'src/environments/environment';
import { ReqEncryptKey } from '../constant/req-encrypt-key.interface';
import { Routing } from '../constant/routing';
import { HttpHeaderFactory } from './core/header';

@Injectable({
  providedIn: 'root'
})
export class AppFetchService {

  constructor(
    private http: HttpClient,
    private rsaEncryptedService: RSAEncryptService,
  ) { }

  public getPublicKey(): Observable<string>{
    const pathName = Routing.API.Authen.GetKey;
    const data: ReqEncryptKey = {
      headerReq : HttpHeaderFactory.getRegularHeaderReq({
        service: 'CustomsServiceEncryptionGetKeyService',
        reqChannel: 'PT'
      })
    }

    return this.http.post(`${environment.apiService.host}${pathName}`, data).pipe(
      tap((res: any) => {
        if(res.content != undefined){
          this.rsaEncryptedService.setPublicKey(res.content.key)
        }
        this.rsaEncryptedService.setStatusCd(res.headerResp.statusCd)
      

      })
    )
  }
}
