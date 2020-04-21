/* global jest beforeEach describe it expect */

const MongoItem = require('../dataset-sync/mongo_item.js');

describe('MongoItem', () => {
  let subject,
    client;

  beforeEach(() => {
    client = {
      collection: () => ({
        findOne: jest.fn().mockResolvedValue(null),
      }),
    };

    subject = new MongoItem({ client });
  });

  describe('get', () => {
    expect.assertions(1);

    it('calls the mongo module and rejects if not existing value', () => {
      expect(subject.get('507f1f77bcf86cd799439011')).rejects.toThrow();
    });
  });
});
