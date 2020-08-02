import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async setObject(key, values) {
    await Storage.set({
      key,
      value: JSON.stringify(values),
    });
  }

  async getObject(key) {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async removeItem(key) {
    await Storage.remove({ key });
  }

  async clear() {
    await Storage.clear();
  }
}
