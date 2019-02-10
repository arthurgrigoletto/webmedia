const expect = require('chai').expect;

const Article = require('../../src/models/entities/Article');

describe('Article Model Validation', () => {
  describe('With Errors', () => {
    it('should be invalid if title is empty', done => {
      const article = new Article({
        subtitle: 'Teste',
        content: 'Teste',
        permalink: 'http://teste.com'
      });

      article.validate(err => {
        expect(err.errors.title).to.exist;
        done();
      });
    });

    it('should be invalid if subtitle is empty', done => {
      const article = new Article({
        title: 'Teste',
        content: 'Teste',
        permalink: 'http://teste.com'
      });

      article.validate(err => {
        expect(err.errors.subtitle).to.exist;
        done();
      });
    });

    it('should be invalid if content is empty', done => {
      const article = new Article({
        title: 'Teste',
        subtitle: 'Teste',
        permalink: 'http://teste.com'
      });

      article.validate(err => {
        expect(err.errors.content).to.exist;
        done();
      });
    });
    it('should be invalid if permalink is empty', done => {
      const article = new Article({
        title: 'Teste',
        subtitle: 'Teste',
        content: 'Test'
      });

      article.validate(err => {
        expect(err.errors.permalink).to.exist;
        done();
      });
    });
  });

  describe('Without Input Errors', () => {
    it('should return err equal null', done => {
      const article = new Article({
        title: 'Teste',
        subtitle: 'Teste',
        content: 'Test',
        permalink: 'teste.com'
      });

      article.validate(err => {
        console.log(err);
        expect(err).to.be.null;
        done();
      });
    });
  });
});
