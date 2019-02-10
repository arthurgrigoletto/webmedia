const expect = require('chai').expect;

const User = require('../../src/models/entities/User');

describe('User Model Validation', () => {
  it('should be invalid if name is empty', done => {
    const user = new User({
      email: 'teste@teste.com',
      password: '123456'
    });

    user.validate(err => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if password is empty', done => {
    const user = new User({
      email: 'teste@teste.com',
      name: 'teste'
    });

    user.validate(err => {
      expect(err.errors.password).to.exist;
      done();
    });
  });
});
