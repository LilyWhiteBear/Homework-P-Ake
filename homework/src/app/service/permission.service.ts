import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentAPI } from '../utils/constant/api';
import { Routing } from '../utils/constant/routing';
import { SessionQuery } from '../utils/session/session.query';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private sessionQuery: SessionQuery,
    private http: HttpClient,
  ) { }

  public GetPermission(): Observable<number> {
    return new Observable((sub) => {
      let userSubsciption = this.sessionQuery.getUserData().subscribe((data: any) => {
        let numberOfDept: number = 0;
        if (data.role == "admin") {
          numberOfDept = 5;
        }
        else if (data.role == "member") {
          numberOfDept = 3;
        }
        else {
          numberOfDept = 1;
        }
        sub.next(numberOfDept);
        sub.complete();
      });
      setTimeout(() => {
        userSubsciption.unsubscribe();
        sub.unsubscribe();
      }, 100);
    })
  }

  public GetDepartment(value: number): Observable<DepartmentAPI[]> {
    return this.http.get<DepartmentAPI[]>(`${Routing.API.Backend.Host}${Routing.API.Backend.Sub.permission}/${value}`);
  }
}
