const expect = require('chai').expect;
const validateRegisterInput = require('../../src/validation/register');

describe('Test register Validation', () => {
  describe('With input errors', () => {
    describe('Name errors', () => {
      const user = {};

      beforeEach(() => {
        user.email = 'teste@teste.com';
        user.password = '123456';
        user.password2 = '123456';
      });

      afterEach(() => {
        user.name = '';
      });

      it('should return error if name is empty', () => {
        const { errors, isValid } = validateRegisterInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('name');
        expect(errors).to.be.eql({
          name: 'Name Field is required'
        });
      });

      it('should return error if name have less than 2 characters', () => {
        user.name = 'a';

        const { errors, isValid } = validateRegisterInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('name');
        expect(errors).to.be.eql({
          name: 'Name must be between 2 and 30 characters'
        });
      });

      it('should return error if username have more than 30 characters', () => {
        user.name = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

        const { errors, isValid } = validateRegisterInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('name');
        expect(errors).to.be.eql({
          name: 'Name must be between 2 and 30 characters'
        });
      });
    });

    describe('Email Errors', () => {
      let user = {};

      beforeEach(() => {
        user.name = 'Teste';
        user.password = '123456';
        user.password2 = '123456';
      });

      afterEach(() => {
        user.email = '';
      });

      it('should return error if email is empty', () => {
        const { errors, isValid } = validateRegisterInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('email');
        expect(errors).to.be.eql({
          email: 'Email Field is required'
        });
      });

      it('should return a errors if email is invalid', () => {
        user.email = 'test';

        const { errors, isValid } = validateRegisterInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('email');
        expect(errors).to.be.eql({
          email: 'Email is invalid'
        });
      });
    });

    describe('Password Errors', () => {
      const user = {};

      beforeEach(() => {
        user.name = 'Teste';
        user.email = 'teste@teste.com';
      });

      afterEach(() => {
        user.password = '';
        user.password2 = '';
      });

      it('should return error if password and password2 is empty', () => {
        const { errors, isValid } = validateRegisterInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('password');
        expect(errors).to.have.property('password2');
        expect(errors).to.be.eql({
          password: 'Password Field is required',
          password2: 'Confirm password field is required'
        });
      });

      it('should return error if password is less then 6 characters', () => {
        user.password = '123';
        user.password2 = '123';

        const { errors, isValid } = validateRegisterInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('password');
        expect(errors).to.be.eql({
          password: 'Password must be at least 6 characters'
        });
      });

      it('should return error if passwords don not match', () => {
        user.password = '123456';
        user.password2 = '12345';

        const { errors, isValid } = validateRegisterInput(user);

        expect(isValid).to.be.false;
        expect(errors).to.have.property('password2');
        expect(errors).to.be.eql({
          password2: 'Passwords must match'
        });
      });
    });
  });

  describe('Without input errors', () => {
    it('should return isValid true and errors as an empty object', () => {
      const user = {
        name: 'Teste',
        email: 'teste@teste.com',
        password: '123456',
        password2: '123456'
      };

      const { errors, isValid } = validateRegisterInput(user);

      expect(isValid).to.be.true;
      expect(errors).to.be.empty;
    });
  });
});
