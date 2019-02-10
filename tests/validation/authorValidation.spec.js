const expect = require('chai').expect;
const validateAuthorInput = require('../../src/validation/author');

describe('Author Validate Test', () => {
  describe('With Input Errors', () => {
    describe('Name', () => {
      it('should return error if name is empty', () => {
        const { errors, isValid } = validateAuthorInput({});

        expect(isValid).to.be.false;
        expect(errors).to.have.property('name');
        expect(errors).to.be.eql({
          name: 'Author Name is required'
        });
      });
    });
  });
  describe('Without Input errors', () => {
    it('should return no error with a text between 10 and 300 characters', () => {
      const { errors, isValid } = validateAuthorInput({
        name: 'Teste'
      });

      expect(isValid).to.be.true;
      expect(errors).to.be.empty;
    });
  });
});
