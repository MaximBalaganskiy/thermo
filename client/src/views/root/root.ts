// eslint-disable-next-line import/no-unassigned-import
import './splash-progress.scss'; // import here since CSS required in HTML cannot be extracted
import { useView, PLATFORM, observable } from 'aurelia-framework';
import { ApiService, ISettings } from '../../services/api-service';
import { MdcSnackbarService } from '@aurelia-mdc-web/snackbar';

@useView(PLATFORM.moduleName('./root.html'))
export class Root {
  constructor(private api: ApiService, private snackbarService: MdcSnackbarService) { }

  settings: ISettings;

  @observable
  apiUrl: string;
  apiUrlChanged() {
    this.api.apiUrl = this.apiUrl;
  }

  async activate() {
    this.apiUrl = this.api.apiUrl;
    if (this.apiUrl) {
      try {
        this.settings = await this.api.getSettings();
        this.settings.dayTemperature = Math.min(30, Math.max(10, this.settings.dayTemperature));
        this.settings.nightTemperature = Math.min(30, Math.max(10, this.settings.nightTemperature));
      } catch {
        this.snackbarService.open('Could not connect to the thermostat');
      }
    } else {
      this.snackbarService.open('Enter Thermostat IP and refresh the page');
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
