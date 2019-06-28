const { MongoClient } = require('mongodb'),
  { RedisClient } = require('redis'),
  RedisItem = require('./redis_item'),
  MongoItem = require('./mongo_item'),
  Item = require('./item');

class ItemFactory {
  static create(client, collection) {
    const clientSpec = client instanceof Object && client.client
        ? client
        : { client },
      ItemType = ItemFactory.itemType(clientSpec.client);

    return new ItemType(Object.assign({}, clientSpec, { collection }));
  }

  static itemType(client) {
    if (client instanceof MongoClient) {
      return MongoItem;
    }
    if (client instanceof RedisClient) {
      return RedisItem;
    }
    return Item;
  }
}

module.exports = ItemFactory;
