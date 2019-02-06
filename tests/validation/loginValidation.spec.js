const expect = require('chai').expect;
const validateLoginInput = require('../../src/validation/login');

describe('Test Login Validation', () => {
  describe('Username Errors', () => {
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
