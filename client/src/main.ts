/* eslint-disable import/no-unassigned-import */
import 'aurelia-bootstrapper';
import { PLATFORM, Aurelia } from 'aurelia-framework';
import { usePropertyTypeForObservable } from 'aurelia-typed-observable-plugin';

export async function configure(aurelia: Aurelia) {
  const globalResources = [
    'converters/number'
  ];

  // if (!environment.production) {
  //   aurelia.use.developmentLogging();
  // }

  aurelia
    .use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('@aurelia-mdc-web/all'))
    .globalResources(globalResources);

  usePropertyTypeForObservable(true);

  await aurelia.start();
  await aurelia.setRoot('views/root/root');
}
