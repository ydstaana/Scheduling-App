import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }
}

export class Storage {
  static CURRENT_USER = 'TRACK_ME_USER';
}
