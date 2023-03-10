import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { persistState } from '@datorama/akita';

if (environment.production) {
  enableProdMode();
}

export const storage = persistState({
  storage: sessionStorage,
});
const provider = [{provide: 'persistStorage', useValue: storage}];

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
