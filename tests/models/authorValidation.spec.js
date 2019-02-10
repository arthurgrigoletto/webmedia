const expect = require('chai').expect;

const Author = require('../../src/models/entities/Author');

describe('Author Model Validation', () => {
  describe('With Input Errors', () => {
    it('should be invalid if name is empty', done => {
      const author = new Author();

      author.validate(err => {
        expect(err.errors.name).to.exist;
        done();
      });
    });
  });

  describe('Without Input Errors', () => {
    it('should return err equal null', done => {
      const author = new Author({
        name: 'Teste'
      });

      author.validate(err => {
        expect(err).to.be.null;
        done();
      });
    });
  });
});
