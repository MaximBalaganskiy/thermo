// eslint-disable-next-line import/no-unassigned-import
import './splash-progress.scss'; // import here since CSS required in HTML cannot be extracted
import { useView, PLATFORM } from 'aurelia-framework';
import { ApiService, ISettings } from '../../services/api-service';
import { MdcSnackbarService } from '@aurelia-mdc-web/snackbar';

@useView(PLATFORM.moduleName('./root.html'))
export class Root {
  constructor(private api: ApiService, private snackbarService: MdcSnackbarService) { }

  settings: ISettings;

  async activate() {
    try {
      this.settings = await this.api.getSettings();
    } catch {
      this.snackbarService.open('Could not connect to the thermostat');
    }
  }

  async changed() {
    try {
      await this.api.postSettings(this.settings);
    } catch {
      this.snackbarService.open('Could not save settings');
    }
  }
}
