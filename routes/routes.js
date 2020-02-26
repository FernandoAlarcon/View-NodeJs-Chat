const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('.././controllers');

router.get('/', controllers.HomeController.index);
