import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { LanguageStore } from './utils/language/language.store';
import { LanguageQuery } from './utils/language/language.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'homework';
  constructor(
    private authService: AuthService,
    private config: PrimeNGConfig,
    private translateService: TranslateService,
    private languageStore: LanguageStore,
    private languageQuery: LanguageQuery
  ) {
  }

  ngOnInit() {
    this.authService.RequiredSigninPage();
    this.languageQuery.getDefaultLang().subscribe(res => {
      if (res) {
        this.translateService.setDefaultLang(res!);
      }
      else {
        this.translateService.setDefaultLang("th");
        this.languageStore.update(() => ({
          default: 'th',
        }));
      }
    });
    this.languageQuery.getUsingLang().subscribe(res => {
      if(res) {
        this.translate(res);
      }
      else {
        this.translate('th');
        this.languageStore.update(() => ({
          use: 'th'
        }));
      }
    })
    //translation
    this.config.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
    });
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => {
      this.config.setTranslation(res);
    });
  }
}
