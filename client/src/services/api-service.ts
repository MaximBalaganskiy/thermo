import { HttpClient } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';

export interface ISettings {
  dayTemperature: number;
  dayStart: string;
  nightTemperature: number;
  nightStart: string;
  on: boolean;
  daylightSavings: boolean;
  triggerTimeout: number;
}

@autoinject
export class ApiService {
  constructor(private http: HttpClient) { }

  async getSettings(): Promise<ISettings> {
    const response = await this.http.get('http://heater.balaganskiy.pro/settings');
    return await response.json() as ISettings;
  }
}
