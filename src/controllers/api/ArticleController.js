const Article = require('../../models/Article');

// Load Input Validation
const validateArticleInput = require('../../validation/article');

const index = async (req, res) => {
  const articles = await Article.find({}).sort('-createdAt');

  return res.json(articles);
};

const store = async (req, res) => {
  const { errors, isValid } = validateArticleInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with erros object
    res.status(400).json(errors);
  }

  const article = await Article.create(req.body);

  req.io.emit('article', article);

  return res.json(article);
};

module.exports = {
  index,
  store
};
