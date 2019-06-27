/* global beforeEach describe it expect */

const Item = require('../lib/item.js');

describe('Item', () => {
  describe('constructor', () => {
    it('can be initialized', () => {
      expect(new Item()).not.toBeNull();
    });
    it('sets an obj', () => {
      const subject = new Item({ client: { a: 1 } });
      expect(subject.obj).toBeTruthy();
    });
  });

  describe('checksum', () => {
    it('returns a checksum from a string', () => {
      expect(typeof Item.checksum('test')).toBe('string');
      expect(Item.checksum('test')).toBe('098f6bcd4621d373cade4e832627b4f6');
    });
  });
  describe('keys', () => {
    it('returns an array of keys', () => {
      const subject = new Item({ client: { a: 1, b: 2 } });

      expect(subject.keys()).resolves.toEqual(expect.arrayContaining(['a', 'b']));
    });
  });
  describe('keysChecksum', () => {
    let subject;
    beforeEach(() => {
      subject = new Item({ client: { a: 1, b: 2 } });
    });
    it('returns a checksum from all keys', () => {
      expect(subject.keysChecksum()).resolves.toBeString();
    });
  });
  describe('valuesChecksum', () => {
    let subject;
    beforeEach(() => {
      subject = new Item({ client: { a: 1, b: 2 } });
    });
    it('returns a checksum from all keys', (done) => {
      subject.valuesChecksum().then((checksum) => {
        expect(checksum).toBeObject();
        expect(checksum).toContainKeys(['a', 'b']);
        expect(checksum.a).toEqual(Item.checksum(String(1)));
        done();
      });
    });
  });
  describe('get', () => {
    it('returns the value of the item', () => {
      const subject = new Item({ client: { a: 1 } });
      expect(subject.get('a')).resolves.toEqual(1);
    });
  });
  describe('set', () => {
    it('sets the value on the item', (done) => {
      const subject = new Item();
      subject.set('a', 1).then(() => {
        expect(subject.get('a')).resolves.toEqual(1);
        done();
      });
    });
  });
});
