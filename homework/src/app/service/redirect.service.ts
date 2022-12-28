import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(
    private router: Router
  ) { }

  public ToHome() : void {
    this.router.navigate(['/main/link']);
  }

  public ToSignIn() : void {
    this.router.navigate(['/auth/login']);
  }

  public ToStep(n: Number | string) {
    this.router.navigate([`/main/form/step${n}`]);
  }
}
