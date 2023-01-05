import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routing } from '../utils/constant/routing';
import { SessionQuery } from '../utils/session/session.query';

@Injectable({
  providedIn: 'root'
})
export class OmiseService {

  constructor(
    private http: HttpClient,
    private sessionQuery: SessionQuery
  ) { }

  public PayByCreditCard(body: any): Observable<any> {
    return new Observable((sub) => {
      this.sessionQuery.getUserData().subscribe((data: any) => {
        this.http.post<any>(`${Routing.API.Backend.Host}${Routing.API.Backend.Sub.credit}`, body, {
          headers: {
            authorization: data.token
          }
        }).subscribe((res: any) => {
          sub.next(res);
        });
      });
    });
  }

  public PayByInternetBanking(body: any): Observable<any> {
    return new Observable((sub) => {
      this.sessionQuery.getUserData().subscribe((data: any) => {
        this.http.post<any>(`${Routing.API.Backend.Host}${Routing.API.Backend.Sub.banking}`, body, {
          headers: {
            authorization: data.token
          }
        }).subscribe((res: any) => {
          sub.next(res);
        });
      });
    });
  }
}
