const express = require('express');
const passport = require('passport');
const multer = require('multer');
const multerConfig = require('./config/multer');

// Import Controllers
const AuthentificationController = require('./controllers/api/AuthController');
const ArticleController = require('./controllers/api/ArticleController');
const AuthorController = require('./controllers/api/AuthorController');
const CommentController = require('./controllers/api/CommentController');
const LikeController = require('./controllers/api/LikeController');

const routes = express.Router();

/*
================================================================================
================================================================================
========================== AUTHENTIFICATION ROUTES =============================
================================================================================
================================================================================
*/

// @route   POST api/auth/login
// @desc    Login User / Returning JWT Token
// @access  Public
routes.post('/auth/login', AuthentificationController.login);

// @route   POST api/auth/register
// @desc    Register User
// @access  Public
routes.post(
  '/auth/register',
  multer(multerConfig).single('file'),
  AuthentificationController.register,
);

// @route   GET api/auth/current
// @desc    Return Current User
// @access  Private
routes.get(
  '/auth/current',
  passport.authenticate('jwt', { session: false }),
  AuthentificationController.current,
);

/*
================================================================================
================================================================================
============================== AUTHOR ROUTES ===================================
================================================================================
================================================================================
*/

// @route   GET api/author
// @desc    Get all Authors
// @access  Public
routes.get('/authors', AuthorController.index);

// @route   GET api/author/:id
// @desc    Get an Author or Fields Author by Id
// @access  Public
routes.get('/authors/:id', AuthorController.getById);

// @route   POST api/author
// @desc    Create an new Author
// @access  Private
routes.post(
  '/authors',
  passport.authenticate('jwt', { session: false }),
  multer(multerConfig).single('file'),
  AuthorController.store,
);

// @route   PUT api/author
// @desc    Update an Author
// @access  Private
routes.put(
  '/authors/:id',
  passport.authenticate('jwt', { session: false }),
  multer(multerConfig).single('file'),
  AuthorController.update,
);

// @route   DELETE api/author/:id
// @desc    Delete an Author
// @access  Private
routes.delete(
  '/authors/:id',
  passport.authenticate('jwt', { session: false }),
  AuthorController.remove,
);

/*
================================================================================
================================================================================
============================== ARTICLE ROUTES ==================================
================================================================================
================================================================================
*/

// @route   GET api/articles
// @desc    GET Articles or Find Article by Permalink
// @access  Public
routes.get('/articles', ArticleController.index);

// @route   GET api/articles/:id
// @desc    GET Article or Fields Article by Id
// @access  Public
routes.get('/articles/:id', ArticleController.getById);

// @route   POST api/articles
// @desc    Create an Articles
// @access  Private
routes.post(
  '/articles',
  passport.authenticate('jwt', { session: false }),
  multer(multerConfig).single('file'),
  ArticleController.store,
);

// @route   PUT api/articles
// @desc    Update an Articles
// @access  Private
routes.put(
  '/articles/:id',
  passport.authenticate('jwt', { session: false }),
  multer(multerConfig).single('file'),
  ArticleController.update,
);

// @route   DELETE api/articles/:id
// @desc    Delete an Article
// @access  Private
routes.delete(
  '/articles/:id',
  passport.authenticate('jwt', { session: false }),
  ArticleController.remove,
);

/*
================================================================================
================================================================================
================================ LIKES ROUTES ==================================
================================================================================
================================================================================
*/

// @route   GET api/:id/like
// @desc    Get Likes from Article
// @access  Public
routes.get('/:id/like', LikeController.getLikes);

// @route   POST api/:id/like
// @desc    Add Like to Article
// @access  Private
routes.post(
  '/:id/like',
  passport.authenticate('jwt', { session: false }),
  LikeController.addLike,
);

// @route   POST api/:id/unlike
// @desc    Remove Like from Article
// @access  Private
routes.post(
  '/:id/unlike',
  passport.authenticate('jwt', { session: false }),
  LikeController.unLike,
);

/*
================================================================================
================================================================================
============================== COMMENTS ROUTES =================================
================================================================================
================================================================================
*/

// @route   GET api/:id/comments
// @desc    GET Article's Comments
// @access  Public
routes.get('/:id/comments', CommentController.getComments);

// @route   POST api/:id/comments
// @desc    Create Article's Comment
// @access  Private
routes.post(
  '/:id/comments',
  passport.authenticate('jwt', { session: false }),
  CommentController.addComment,
);

// @route   PUT api/:id/comments
// @desc    Update Article's Comment
// @access  Private
routes.put(
  '/:id/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  CommentController.updateComment,
);

// @route   Delete api/:id/comments
// @desc    Delete Article's Comment
// @access  Private
routes.delete(
  '/:id/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  CommentController.deleteComment,
);

module.exports = routes;
