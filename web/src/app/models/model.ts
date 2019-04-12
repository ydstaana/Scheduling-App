import { ApiClient } from '../api/api.cilent';

export abstract class Model {
  private static _api;
  id: number;
  dateCreated: Date;
  lastUpdated: Date;

  static setApiClient(arg: ApiClient) {
    this._api = arg;
  }

  static api(): ApiClient {
    return this._api;
  }
}
