import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Routing } from 'src/app/utils/constant/routing';

@Directive({
  selector: '[appStreamingLogin]'
})
export class StreamingLoginDirective {

  @Output() appStreamingLogin = new EventEmitter();

  constructor(
    public authService: AuthService,
  ) { }

  @HostListener('click', []) LogInViaStreaming() {
    this.authService.isSigningIn = true;
    const w = window.open('', '', 'width=600, height=400,left=200,top=200');

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${Routing.API.Streaming.Login}`);
    xhttp.onreadystatechange = () => {
      if(w?.closed) {
        xhttp.abort();
        this.authService.isSigningIn = false;
        this.appStreamingLogin.emit("canceled");
      }
      let resArr = xhttp.response.includes("[") && !xhttp.response.includes("]") ? JSON.parse(xhttp.response + "]") : [];
      console.log(resArr[resArr.length - 1]);
      try {
        if (resArr[resArr.length - 1].isLogedIn === true) {
          xhttp.abort();
          w?.close();
          this.authService.AdminSignin();
          this.appStreamingLogin.emit("success");
        }
      }
      catch {

      }
    }
    xhttp.send();
  }

}
