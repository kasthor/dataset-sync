const { MongoClient } = require('mongodb'),
  { RedisClient } = require('redis'),
  RedisItem = require('./redis_item'),
  MongoItem = require('./mongo_item'),
  Item = require('./item');

class ItemFactory {
  static create(client, collection) {
    const ItemType = ItemFactory.itemType(client);

    return new ItemType({ client, collection });
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
