const promisify = require('util.promisify'),
  Item = require('./item'),
  KeyNotFoundError = require('./key_not_found_error');

class RedisItem extends Item {
  constructor(options = {}) {
    super(options);
    this.client = options.client;
    this.key = options.collection;
  }

  do(func, ...args) {
    return promisify(this.client[func]).bind(this.client)(this.key, ...args);
  }

  _get(key) {
    return this.do('hget', key)
      .then((item) => {
        if (item == null) {
          throw (new KeyNotFoundError());
        }

        return item;
      })
      .then(JSON.parse);
  }

  _keys() {
    return this.do('hkeys');
  }

  _keyValues() {
    return this.do('hgetall').then(keyValues => Object.assign({},
      ...Object.keys(keyValues || {}).map(key => ({ [key]: JSON.parse(keyValues[key]) }))));
  }

  _set(key, value) {
    return this.do('hset', key, JSON.stringify(value));
  }

  _remove(key) {
    return this.do('hdel', key);
  }
}

module.exports = RedisItem;
