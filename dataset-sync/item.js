const Noh = require('node-object-hash'),
  KeyNotFoundError = require('./key_not_found_error'),
  { hash } = Noh({ sort: true, coerce: true });


class Item {
  static checksum(obj) {
    return hash(obj);
  }

  static rejectRead() {
    return Promise.reject(new Error('Attempting to read, but reads are not allowed'));
  }

  static rejectWrite() {
    return Promise.reject(new Error('Attemting to write, but writes are not allowed'));
  }

  static notFoundErrorIfNull(item) {
    if (item == null) {
      throw (new KeyNotFoundError());
    }

    return item;
  }

  constructor({ client = {}, read = true, write = true } = {}) {
    this.obj = client;
    this.read = read;
    this.write = write;
  }

  get(key) {
    // if (!this.read) return Item.rejectRead();

    return this._get(key);
  }

  _get(key) {
    if (!(key in this.obj)) {
      return Promise.reject(new KeyNotFoundError());
    }
    return Promise.resolve(this.obj[key]);
  }

  keys() {
    // if (!this.read) return Item.rejectRead();

    return this._keys();
  }

  _keys() {
    return Promise.resolve(Object.keys(this.obj));
  }

  keyValues() {
    // if (!this.read) return Item.rejectRead();

    return this._keyValues();
  }

  _keyValues() {
    return Promise.resolve(this.obj);
  }

  set(key, value) {
    if (!this.write) return Item.rejectWrite();

    return this._set(key, value);
  }

  _set(key, value) {
    this.obj[key] = value;
    return Promise.resolve(value);
  }

  remove(key) {
    if (!this.write) return Item.rejectWrite();

    return this._remove(key);
  }

  _remove(key) {
    delete this.obj[key];
    return Promise.resolve();
  }


  keysChecksum() {
    return new Promise((resolve, reject) => this.keys().then(keys => resolve(Item.checksum((keys || []).sort().join('')))).catch(e => reject(e)));
  }

  valuesChecksum() {
    return new Promise((resolve, reject) => {
      this.keyValues().then((obj) => {
        resolve(Object.assign({}, ...Object
          .keys(obj || {}).map(key => ({ [key]: Item.checksum(obj[key]) }))));
      }).catch((e => reject(e)));
    });
  }
}

module.exports = Item;
