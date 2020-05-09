const { promisify } = require('util'),
  Item = require('./item');

class RedisItem extends Item {
  constructor(options = { promisify: true }) {
    super(options);
    this.client = options.client;
    this.key = options.collection;
    this.promisify = options.promisify;
  }

  do(func, ...args) {
    if (promisify) {
      return promisify(this.client[func]).bind(this.client)(this.key, ...args);
    }

    return this.client[func].call(this.client, ...args);
  }

  _get(key) {
    return this.do('hget', key)
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
