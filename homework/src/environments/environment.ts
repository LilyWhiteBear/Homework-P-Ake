// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiService: {
    // host: 'api',
    host: 'https://uat.customstraderportal.com',
    sk: 'Zop5yaweB2C0q4l1RI0x7XYd0B54NzPO',
    iv: 'Zop5yaweB2C0q4l1',
    encrypt: true
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
