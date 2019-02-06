const express = require('express');
const passport = require('passport');
const multer = require('multer');
const multerConfig = require('./config/multer');
const AuthentificationController = require('./controllers/api/AuthController');
const ArticleController = require('./controllers/api/ArticleController');
const AuthorController = require('./controllers/api/AuthorController');

const routes = express.Router();

/*
===============================================================================================================================================================
===============================================================================================================================================================
============================================================= AUTHENTIFICATION ROUTES =========================================================================
===============================================================================================================================================================
===============================================================================================================================================================
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
  AuthentificationController.register
);

// @route   GET api/auth/current
// @desc    Return Current User
// @access  Private
routes.get(
  '/auth/current',
  passport.authenticate('jwt', { session: false }),
  AuthentificationController.current
);

/*
===============================================================================================================================================================
===============================================================================================================================================================
=================================================================== AUTHOR ROUTES =============================================================================
===============================================================================================================================================================
===============================================================================================================================================================
*/

// @route   GET api/author
// @desc    Get all Authors
// @access  Public
routes.get('/author', AuthorController.index);

// @route   POST api/author
// @desc    Create an new Author
// @access  Private
routes.post(
  '/author',
  passport.authenticate('jwt', { session: false }),
  multer(multerConfig).single('file'),
  AuthorController.create
);

// @route   PUT api/author
// @desc    Update an Author
// @access  Private
// routes.put(
//   '/author/:id',
//   passport.authenticate('jwt', { session: false }),
//   multer(multerConfig).single('file'),
//   AuthorController.update
// );

// @route   DELETE api/author/:id
// @desc    Delete an Author
// @access  Private
routes.delete(
  '/author/:id',
  passport.authenticate('jwt', { session: false }),
  AuthorController.delete
);

/*
===============================================================================================================================================================
===============================================================================================================================================================
================================================================== ARTICLE ROUTES =============================================================================
===============================================================================================================================================================
===============================================================================================================================================================
*/

// @route   GET api/article
// @desc    GET Articles
// @access  Public
routes.get('/article', ArticleController.index);

// @route   POST api/article
// @desc    Create an Articles
// @access  Private
routes.post(
  '/article',
  passport.authenticate('jwt', { session: false }),
  ArticleController.store
);

// TODO - Likes Routes

// TODO - Comments Routes

module.exports = routes;
