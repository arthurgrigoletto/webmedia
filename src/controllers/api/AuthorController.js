/* eslint no-param-reassign: ["error", { "props": false }] */

const Author = require('../../models/entities/Author');

// Load Input Validation
const validateAuthorInput = require('../../validation/author');

const index = async (req, res) => {
  const { name = '', page = 1, limit = 5 } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { name: 1 },
  };

  const authors = name
    ? await Author.findOne({ name })
    : await Author.paginate({}, options);

  return res.json(authors);
};

const getById = async (req, res) => {
  let authorFields;

  if (!req.query) {
    authorFields = await Author.findById(req.params.id);
  } else {
    const params = Object.keys(req.query).join(' ');
    authorFields = await Author.findById(req.params.id).select(params);
  }

  return res.json(authorFields);
};

const store = (req, res) => {
  const { errors, isValid } = validateAuthorInput(req.body);
  const { name, description } = req.body;
  const { key, location: profilePicture = '' } = req.file;

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with erros object
    return res.status(400).json(errors);
  }

  return Author.findOne({ name }).then((author) => {
    if (author) {
      errors.name = 'Author already exists';
      return res.status(400).json(errors);
    }

    const newAuthor = new Author({
      name,
      description,
      profilePicture,
      key,
    });

    return newAuthor
      .save()
      .then(autor => res.status(200).json(autor))
      .catch(err => res.status(500).json(err));
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  Author.findById(id)
    .then((author) => {
      if (req.file) {
        const { key, location: url = '' } = req.file;

        author.profilePicture = url;
        author.key = key;
      }

      // New name
      author.name = name || author.name;
      // New Description
      author.description = description || author.description;

      author.save().then(autor => res.json(autor));
    })
    .catch(() => res.status(404)
      .json({ noAuthorFound: `No author was found with id ${id}` }));
};

const remove = async (req, res) => {
  const author = await Author.findById(req.params.id);

  await author.remove();

  return res.json({ msg: 'Delete Success' });
};
module.exports = {
  index,
  getById,
  store,
  update,
  remove,
};
