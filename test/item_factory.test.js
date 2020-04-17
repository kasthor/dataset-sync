/* global describe it expect */

const { MongoClient } = require('mongodb'),
  { RedisClient } = require('redis'),
  ItemFactory = require('../dataset-sync/item_factory'),
  Item = require('../dataset-sync/item'),
  RedisItem = require('../dataset-sync/redis_item'),
  MongoItem = require('../dataset-sync/mongo_item');

describe('Items Factory', () => {
  describe('create', () => {
    it('returns an Item', () => {
      expect(ItemFactory.create({}, ['a'])).toBeInstanceOf(Item);
    });
    it('returns a Redis item', () => {
      expect(ItemFactory.create(new RedisClient(), ['a'])).toBeInstanceOf(RedisItem);
    });
    it('returns a Mongo item', () => {
      expect(ItemFactory.create(new MongoClient(), ['a'])).toBeInstanceOf(MongoItem);
    });
  });
  describe('itemType', () => {
    it('returns item', () => {
      expect(ItemFactory.itemType({})).toBe(Item);
    });
    it('returns RedisItem', () => {
      const client = new RedisClient();
      expect(ItemFactory.itemType({ client })).toBe(RedisItem);
    });
    it('returns MongoItem', () => {
      const client = new MongoClient();
      expect(ItemFactory.itemType({ client })).toBe(MongoItem);
    });
  });
});
