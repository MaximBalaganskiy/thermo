// eslint-disable-next-line import/no-unassigned-import
import './splash-progress.scss'; // import here since CSS required in HTML cannot be extracted
import { useView, PLATFORM } from 'aurelia-framework';
import { ApiService, ISettings } from '../../services/api-service';

@useView(PLATFORM.moduleName('./root.html'))
export class Root {
  constructor(private api: ApiService) { }

  settings: ISettings;

  async activate() {
    this.settings = await this.api.getSettings();
  }
}
