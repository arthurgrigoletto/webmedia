const expect = require('chai').expect;
const validateLoginInput = require('../../src/validation/login');

describe('Test Login Validation', () => {
  describe('With Input Errors', () => {
    describe('Email Errors', () => {
      const user = {};

      beforeEach(() => {
        user.password = '123456';
      });

      it('should return error if username is empty', () => {
        const { errors, isValid } = validateLoginInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('email');
        expect(errors).to.be.eql({
          email: 'Email Field is required'
        });
      });
    });

    describe('Password Errors', () => {
      const user = {};

      beforeEach(() => {
        user.email = 'teste@teste.com';
      });

      afterEach(() => {
        user.password = '';
      });

      it('should return errors if password is empty', () => {
        const { errors, isValid } = validateLoginInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('password');
        expect(errors).to.be.eql({
          password: 'Password Field is required'
        });
      });

      it('should return errors if password have less than 6 characters', () => {
        user.password = '12345';

        const { errors, isValid } = validateLoginInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('password');
        expect(errors).to.be.eql({
          password: 'Password must be at least 6 characters'
        });
      });
    });
  });

  describe('Without Input Errors', () => {
    it('should return isValid true and errors as an empty object', () => {
      const user = {
        email: 'teste@gmail.com',
        password: '123456'
      };
      const { errors, isValid } = validateLoginInput(user);

      expect(isValid).to.be.true;
      expect(errors).to.be.empty;
    });
  });
});
