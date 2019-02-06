const Author = require('../../models/entities/Author');

module.exports = {
  async index(req, res) {
    const authors = await Author.find({}).sort('name');

    return res.json(authors);
  },

  async create(req, res) {
    const errors = {};
    const { name, description } = req.body;
    const { location: url = '' } = req.file;

    Author.findOne({ name }).then((author) => {
      if (author) {
        errors.name = 'Author already exists';
        return res.status(400).json(errors);
      }

      const newAuthor = new Author({
        name,
        description,
        profilePicture: url,
      });

      return newAuthor
        .save()
        .then(autor => res.status(200).json(autor))
        .catch(err => res.status(500).json(err));
    });
  },

  async delete(req, res) {
    const author = await Author.findById(req.params.id);

    await author.remove();

    return res.send();
  },
};
