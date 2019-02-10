/* eslint no-param-reassign: ["error", { "props": false }] */

const Article = require('../../models/entities/Article');

// Load Input Validation
const validateArticleInput = require('../../validation/article');

const gerenateAuthorArray = (ids) => {
  const authorsIds = ids.split(',');
  const autores = authorsIds.reduce((authors, id) => {
    const author = {
      author: id,
    };

    authors.push(author);
    return authors;
  }, []);

  return autores;
};

function hasAuthor(authors, author) {
  return authors.filter(autor => autor.author.toString() === author).length === 0;
}

function newArrayInexistentAuthor(autores, newAuthors) {
  return newAuthors.split(',').reduce((authors, author) => {
    if (!hasAuthor(autores, author)) {
      authors.push({ author });
    }
    return authors;
  }, []);
}

const index = async (req, res) => {
  const { permalink = '', page = 1, limit = 5 } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: '-createdAt',
  };

  const articles = permalink
    ? await Article.findOne({ permalink })
    : await Article.paginate({}, options);
    // await Article.find({}).sort('-createdAt');
  return res.json(articles);
};

const getById = async (req, res) => {
  let articleFields;

  if (!req.query) {
    articleFields = await Article.findById(req.params.id);
  } else {
    const params = Object.keys(req.query).join(' ');
    articleFields = await Article.findById(req.params.id).select(params);
  }

  return res.json(articleFields);
};

const store = (req, res) => {
  const { errors, isValid } = validateArticleInput(req.body);
  const {
    title,
    subtitle,
    content,
    permalink,
    authorsIds,
  } = req.body;
  const {
    key,
    location: banner = '',
  } = req.file;

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with erros object
    return res.status(400).json(errors);
  }

  const authors = gerenateAuthorArray(authorsIds);

  const newArticle = new Article({
    title,
    subtitle,
    content,
    permalink,
    authors,
    key,
    banner,
  });

  return newArticle
    .save()
    .then(artigo => res.json(artigo))
    .catch(err => res.status(500).json(err));
};

const update = (req, res) => {
  const {
    title,
    subtitle,
    content,
    permalink,
    authorsIds,
  } = req.body;
  const {
    id,
  } = req.params;

  return Article.findById(id).then((article) => {
    // New Banner
    if (req.file) {
      const { key, location: url = '' } = req.file;

      article.banner = url;
      article.key = key;
    }

    // New Author
    if (authorsIds) {
      const newAuthors = newArrayInexistentAuthor(article.authors, authorsIds);
      article.authors = [...article.authors, ...newAuthors];
    }

    // New Title
    article.title = title || article.title;

    // New Subtitle
    article.subtitle = subtitle || article.subtitle;

    // Updated_at
    article.updatedAt = new Date();

    // New Content
    article.content = content || article.content;

    // New Permalink
    article.permalink = permalink || article.permalink;

    return article.save().then(artigo => res.json(artigo));
  });
};

const remove = async (req, res) => {
  const article = await Article.findById(req.params.id);

  await article.remove();

  return res.json({ msg: 'Delete Success' });
};

module.exports = {
  index,
  getById,
  store,
  update,
  remove,
};
