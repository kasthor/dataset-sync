/* global describe it expect */

const { MongoClient } = require('mongodb'),
  { RedisClient } = require('redis'),
  ItemFactory = require('../lib/item_factory'),
  Item = require('../lib/item'),
  RedisItem = require('../lib/redis_item'),
  MongoItem = require('../lib/mongo_item');

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
    it('returns MongoItem', () => {
      expect(ItemFactory.itemType(new RedisClient())).toBe(RedisItem);
    });
    it('returns MongoItem', () => {
      expect(ItemFactory.itemType(new MongoClient())).toBe(MongoItem);
    });
  });
});
