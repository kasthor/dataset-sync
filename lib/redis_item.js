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

  get(key) {
    return this.do('hget', key).then(JSON.parse);
  }

  set(key, value) {
    return this.do('hset', key, JSON.stringify(value));
  }

  remove(key) {
    return this.do('hdel', key);
  }

  keys() {
    return this.do('hkeys');
  }

  keyValues() {
    return this.do('hgetall');
  }
}

module.exports = RedisItem;
