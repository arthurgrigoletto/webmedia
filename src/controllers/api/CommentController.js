/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const Article = require('../../models/entities/Article');

// Load Input Validation
const validateCommentInput = require('../../validation/comment');

const addComment = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);
  const { text } = req.body;
  const { name, id, avatar } = req.user;

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with erros object
    res.status(400).json(errors);
  }

  return Article.findById(req.params.id)
    .then((article) => {
      const newComment = {
        text,
        user: id,
        avatar,
        name,
      };

      // Add to Comments Array
      article.comments.unshift(newComment);

      // Save
      article.save().then(post => res.json(post));
    })
    .catch(() => res.status(404).json({ articlenotfound: 'No Article Find' }));
};

// Get Comments by Article
const getComments = (req, res) => Article.findById(req.params.id)
  .then(article => res.json(article.comments))
  .catch(() => res.status(404).json({ articlenotfound: 'No Article Find' }));

// General Method
const generalMethod = (typeMethod, req, res) => {
  const { id: articleId, commentId } = req.params;
  const { _id: userId } = req.user;
  const { text: newComment } = req.body;

  return Article.findById(articleId)
    .then((article) => {
      // Check if comment exists
      if (
        article.comments.filter(comment => comment._id.toString() === commentId)
          .length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexists: 'Comment does not exist' });
      }

      // Get remove index
      const commentIndex = article.comments
        .map(item => item._id.toString())
        .indexOf(commentId);

      // Check if user is the same
      if (
        article.comments[commentIndex].user.toString() !== userId.toString()
      ) {
        return res
          .status(405)
          .json({ notallowed: 'You can only delete your comments' });
      }

      switch (typeMethod) {
        case 'delete':
          // Splice comment out of array
          article.comments.splice(commentIndex, 1);
          break;
        case 'put':
          article.comments[commentIndex].text = newComment;
          break;
        default:
          break;
      }

      // Save
      return article.save().then(article1 => res.json(article1));
    })
    .catch(() => res.json(404).json({ articlenotfound: 'No Article Found' }));
};
// Update Comment
const updateComment = (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with erros object
    res.status(400).json(errors);
  }

  return generalMethod('put', req, res);
};

// Delete Comment
const deleteComment = (req, res) => generalMethod('delete', req, res);

module.exports = {
  addComment,
  getComments,
  updateComment,
  deleteComment,
};
