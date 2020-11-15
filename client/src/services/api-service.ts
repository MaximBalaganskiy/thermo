import { HttpClient } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';

export interface ISettings {
  currentTime: string;
  currentTemperature: number;
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
    const response = await this.http.get('settings');
    return await response.json() as ISettings;
  }

  async postSettings(settings: ISettings): Promise<void> {
    await this.http.post('settings', JSON.stringify(settings), { headers: { 'Content-Type': 'application/json' } } as RequestInit);
  }
}
