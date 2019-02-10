const expect = require('chai').expect;
const validateCommentInput = require('../../src/validation/comment');

describe('Comment Validate Test', () => {
  describe('With Input Errors', () => {
    describe('Text', () => {
      it('should return error if text is empty', () => {
        const { errors, isValid } = validateCommentInput({});

        expect(isValid).to.be.false;
        expect(errors).to.have.property('text');
        expect(errors).to.be.eql({
          text: 'Comment Field is Required'
        });
      });

      it('should return error if text have less than 10 characters', () => {
        const { errors, isValid } = validateCommentInput({ text: 'a' });

        expect(isValid).to.be.false;
        expect(errors).to.have.property('text');
        expect(errors).to.be.eql({
          text: 'Comment must be between 10 and 300 characters'
        });
      });

      it('should return error if text have more than 300 characters', () => {
        const { errors, isValid } = validateCommentInput({
          text: 'a'.repeat(301)
        });

        expect(isValid).to.be.false;
        expect(errors).to.have.property('text');
        expect(errors).to.be.eql({
          text: 'Comment must be between 10 and 300 characters'
        });
      });
    });
  });
  describe('Without Input errors', () => {
    it('should return no error with a text between 10 and 300 characters', () => {
      const { errors, isValid } = validateCommentInput({
        text: 'a'.repeat(200)
      });

      expect(isValid).to.be.true;
      expect(errors).to.be.empty;
    });
  });
});
