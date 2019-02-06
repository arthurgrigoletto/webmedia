const express = require('express');
const passport = require('passport');
const AuthentificationController = require('./controllers/api/AuthController');
const ArticleController = require('./controllers/api/ArticleController');

const routes = express.Router();

// Authentification Routes

// @route   POST api/auth/login
// @desc    Login User / Returning JWT Token
// @access  Public
routes.post('/auth/login', AuthentificationController.login);

// @route   POST api/auth/register
// @desc    Register User
// @access  Public
routes.post('/auth/register', AuthentificationController.register);

// @route   GET api/auth/current
// @desc    Return Current User
// @access  Private
routes.get(
  '/auth/current',
  passport.authenticate('jwt', { session: false }),
  AuthentificationController.current
);

// TODO - User Routes

// TODO - Article Routes

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
