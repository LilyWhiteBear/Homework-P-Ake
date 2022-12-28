import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { RedirectService } from 'src/app/service/redirect.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public sidebarState : boolean = false;

  constructor(
    private redirectService: RedirectService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  public SwitchSidebar() : void {
    this.sidebarState = !this.sidebarState;
  }

  public RedirectToHome(): void {
    this.redirectService.ToHome();
    this.sidebarState = false;
  }

  public SignOut(): void {
    this.authService.Signout();
  }
}
