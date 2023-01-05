import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  private responseCache = new Map();

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.canCache(request)) {
      return next.handle(request);
    }
    const cache = this.responseCache.get(request.urlWithParams)
    if(cache) {
      return of(cache);
    }
    return next.handle(request).pipe(tap((response: any) => {
      this.responseCache.set(request.urlWithParams, response);
    }));
  }

  private canCache(request: HttpRequest<unknown>): boolean {
    return request.urlWithParams.includes('permission');
  }
}
