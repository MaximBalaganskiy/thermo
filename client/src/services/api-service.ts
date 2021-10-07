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

  get apiUrl(): string {
    return window.localStorage.getItem('apiUrl') ?? '';
  }

  set apiUrl(value: string) {
    if (value) {
      window.localStorage.setItem('apiUrl', value);
    } else {
      window.localStorage.removeItem('apiUrl');
    }
  }

  async getSettings(): Promise<ISettings> {
    const response = await this.http.get(`${this.apiUrl}/settings`);
    return await response.json() as ISettings;
  }

  async postSettings(settings: ISettings): Promise<void> {
    await this.http.post(`${this.apiUrl}/settings`, JSON.stringify(settings), { headers: { 'Content-Type': 'application/json' } } as RequestInit);
  }
}
