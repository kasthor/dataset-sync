const crypto = require('crypto');

class Item {
  static checksum(str) {
    return crypto
      .createHash('md5')
      .update(str)
      .digest('hex');
  }

  constructor(options = {}) {
    this.obj = options.client || {};
  }

  get(key) {
    return Promise.resolve(this.obj[key]);
  }

  set(key, value) {
    this.obj[key] = value;
    return Promise.resolve(value);
  }

  remove(key) {
    delete this.obj[key];
    return Promise.resolve();
  }

  keys() {
    return Promise.resolve(Object.keys(this.obj));
  }

  keyValues() {
    return Promise.resolve(this.obj);
  }

  keysChecksum() {
    return new Promise(r => this.keys().then(keys => r(Item.checksum(keys.sort().join('')))));
  }

  valuesChecksum() {
    return new Promise((resolve) => {
      this.keyValues().then((obj) => {
        resolve(Object.assign(
          {},
          ...Object.keys(obj).map(
            key => ({ [key]: Item.checksum(obj[key].toString()) }),
          ),
        ));
      });
    });
  }
}

module.exports = Item;
