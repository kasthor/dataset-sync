const RedisItem = require('./redis_item'),
  MongoItem = require('./mongo_item'),
  Item = require('./item');

class ItemFactory {
  static create(client, collection) {
    const clientSpec = client instanceof Object && client.client
        ? client
        : { client },
      ItemType = ItemFactory.itemType(clientSpec);

    return new ItemType(Object.assign({}, clientSpec, { collection }));
  }

  static itemType(spec) {
    const clientClass = spec.client && spec.client.constructor && spec.client.constructor.name;

    if (clientClass === 'RedisClient' || spec.type === 'redis') {
      return RedisItem;
    }
    if (clientClass === 'MongoClient' || spec.type === 'mongo') {
      return MongoItem;
    }
    return Item;
  }
}

module.exports = ItemFactory;
