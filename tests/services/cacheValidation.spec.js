const expect = require('chai').expect;
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const cacheService = require('../../src/models/services/CacheService');

describe('Cache Service Test', () => {
  it('shold create cache folders', done => {

    if (fs.existsSync('./tmp'))
      rimraf.sync(path.resolve(__dirname, '..', '..', 'tmp'));

    cacheService.createCacheFolders();

    expect(fs.existsSync('./tmp')).to.be.true;
    done();
  })
})
