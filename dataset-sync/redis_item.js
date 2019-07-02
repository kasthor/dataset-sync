const promisify = require('util.promisify'),
  Item = require('./item');

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
    return this.do('hget', key).then(JSON.parse);
  }

  _keys() {
    return this.do('hkeys');
  }

  _keyValues() {
    return this.do('hgetall');
  }

  _set(key, value) {
    return this.do('hset', key, JSON.stringify(value));
  }

  _remove(key) {
    return this.do('hdel', key);
  }
}

module.exports = RedisItem;
