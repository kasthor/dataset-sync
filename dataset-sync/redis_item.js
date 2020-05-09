const { promisify } = require('util'),
  Item = require('./item');

class RedisItem extends Item {
  // eslint-disable-next-line no-shadow
  constructor({ client = null, collection = null, promisify = true } = {}) {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);
    this.client = client;
    this.key = collection;
    this.promisify = promisify;
  }

  do(func, ...args) {
    if (this.promisify) {
      return promisify(this.client[func]).bind(this.client)(this.key, ...args);
    }

    return this.client[func].call(this.client, this.key, ...args);
  }

  _get(key) {
    return this.do('hget', key)
      .catch(() => { throw new Error('Redis Client did err'); })
      .then(Item.notFoundErrorIfNull)
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
