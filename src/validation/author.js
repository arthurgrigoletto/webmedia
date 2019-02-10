/* eslint no-param-reassign: ["error", { "props": false }] */

const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateAuthorInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Author Name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
