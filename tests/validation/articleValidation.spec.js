const expect = require('chai').expect;
const validateArticleInput = require('../../src/validation/article');

describe('Article Validation Test', () => {
  describe('With Input Errors', () => {
    describe('Title Errors', () => {
      it('should return errors if title is empty', () => {
        const article = {
          subtitle: 'Teste',
          content: 'Teste',
          permalink: 'http://teste.com',
          authorsIds: '123156465'
        };

        const { errors, isValid } = validateArticleInput(article);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('title');
        expect(errors).to.be.eql({
          title: 'Title Field is required'
        });
      });
    });

    describe('Subitle Errors', () => {
      it('should return errors if Subtitle is empty', () => {
        const article = {
          title: 'Teste',
          content: 'Teste',
          permalink: 'http://teste.com',
          authorsIds: '123156465'
        };

        const { errors, isValid } = validateArticleInput(article);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('subTitle');
        expect(errors).to.be.eql({
          subTitle: 'Subtitle Field is required'
        });
      });
    });

    describe('Content Errors', () => {
      it('should return errors if Content is empty', () => {
        const article = {
          title: 'Teste',
          subtitle: 'Teste',
          permalink: 'http://teste.com',
          authorsIds: '123156465'
        };

        const { errors, isValid } = validateArticleInput(article);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('content');
        expect(errors).to.be.eql({
          content: 'Content Field is required'
        });
      });
    });

    describe('Permalink Errors', () => {
      it('should return errors if Permalink is empty', () => {
        const article = {
          title: 'Teste',
          subtitle: 'Teste',
          content: 'Teste',
          authorsIds: '123156465'
        };

        const { errors, isValid } = validateArticleInput(article);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('permalink');
        expect(errors).to.be.eql({
          permalink: 'Permalink Field is required'
        });
      });

      it('should return errors if Permalink is invalid', () => {
        const article = {
          title: 'Teste',
          subtitle: 'Teste',
          content: 'Teste',
          permalink: 'teste',
          authorsIds: '123156465'
        };

        const { errors, isValid } = validateArticleInput(article);
        expect(isValid).to.be.false;
        expect(errors).to.have.property('permalink');
        expect(errors).to.be.eql({
          permalink: 'Permalink Field is not an valid URL'
        });
      });
    });

    describe('AuthorsIds Errors', () => {
      it('should return errors if AuthorsIds is empty', () => {
        const article = {
          title: 'Teste',
          subtitle: 'Teste',
          content: 'Teste',
          permalink: 'http://teste.com'
        };

        const { errors, isValid } = validateArticleInput(article);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('authorsIds');
        expect(errors).to.be.eql({
          authorsIds: 'Article must have at least one author'
        });
      });
    });
  });

  describe('Without Input Erros', () => {
    it('should return isValid true and errors as an empty object', () => {
      const article = {
        title: 'Teste',
        subtitle: 'Teste',
        content: 'Teste',
        permalink: 'http://teste.com',
        authorsIds: '123156465'
      };

      const { errors, isValid } = validateArticleInput(article);
      expect(isValid).to.be.true;
      expect(errors).to.be.empty;
    });
  });
});
