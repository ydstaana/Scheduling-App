import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Model } from '../models/model';
import { ApiClient } from '../api/api.cilent';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  getConfig() {
    Model.setApiClient(
      new ApiClient(this.http, environment.configUrl)
    );
  }
}
