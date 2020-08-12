import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(item: string) {
    localStorage.removeItem(item);
  }

  getItem(item: string) {
    return localStorage.getItem(item)
      ? JSON.parse(localStorage.getItem(item))
      : null;
  }

  clearStorage() {
    return localStorage.clear();
  }
}
