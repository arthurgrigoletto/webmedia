/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const Article = require('../../models/entities/Article');

const getLikes = async (req, res) => {
  const { id } = req.params;

  const article = await Article.findById(id);

  return res.json(article.likes);
};

const addLike = (req, res) => {
  const { id: userId } = req.user;
  const { id: articleId } = req.params;

  Article.findById(articleId)
    .then((article) => {
      if (
        article.likes.filter(like => like.user.toString() === userId).length > 0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: 'User already liked this article' });
      }

      // Add user id to likes array
      article.likes.unshift({ user: userId });

      return article.save().then(artigo => res.json(artigo));
    })
    .catch(() => res.status(404).json({ articlenotfound: 'No Article Found' }));
};

const unLike = (req, res) => {
  const { id: userId } = req.user;
  const { id: articleId } = req.params;

  Article.findById(articleId)
    .then((article) => {
      if (
        article.likes.filter(like => like.user.toString() === userId).length === 0
      ) {
        return res
          .status(400)
          .json({ notliked: 'You have not yet liked this post' });
      }

      // Get remove index
      const removeIndex = article.likes
        .map(item => item.user.toString())
        .indexOf(userId);

      // Splice out of array
      article.likes.splice(removeIndex, 1);

      // Save
      return article.save().then(artigo => res.json(artigo));
    })
    .catch(() => res.status(404).json({ articlenotfound: 'No Article Found' }));
};

module.exports = {
  getLikes,
  addLike,
  unLike,
};
