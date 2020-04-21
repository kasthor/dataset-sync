/* global jest beforeEach describe it expect */

const RedisItem = require('../dataset-sync/redis_item.js');

describe('RedisItem', () => {
  let subject,
    client;

  beforeEach(() => {
    client = {
      hget: jest.fn((model, key, callback) => {
        callback();
      }),
    };

    subject = new RedisItem({ client });
  });

  describe('get', () => {
    expect.assertions(1);

    it('calls the redis module and rejects if null value', () => {
      expect(subject.get('not_existing_key')).rejects.toThrow();
    });
  });
});
