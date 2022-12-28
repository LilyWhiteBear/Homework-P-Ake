import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentAPI } from '../utils/constant/api';
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
      this.sessionQuery.getUserData().subscribe((data: any) => {
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
      });
    })
  }

  public GetDepartment(value: number): Observable<DepartmentAPI[]> {
    return this.http.get<DepartmentAPI[]>(`https://anapioficeandfire.com/api/books?page=1&pageSize=${value}`);
  }
}
