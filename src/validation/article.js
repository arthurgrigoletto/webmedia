/* eslint no-param-reassign: ["error", { "props": false }] */

const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateArticleInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.subtitle = !isEmpty(data.subtitle) ? data.subtitle : '';
  data.content = !isEmpty(data.content) ? data.content : '';
  data.permalink = !isEmpty(data.permalink) ? data.permalink : '';
  data.authorsIds = !isEmpty(data.authorsIds) ? data.authorsIds : '';

  if (Validator.isEmpty(data.subtitle)) {
    errors.subTitle = 'Sub title Field is required';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'title Field is required';
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = 'Content Field is required';
  }

  if (Validator.isEmpty(data.permalink)) {
    errors.permalink = 'Permalink Field is required';
  }

  if (Validator.isEmpty(data.authorsIds)) {
    errors.authorsIds = 'Article must have at least one author';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
