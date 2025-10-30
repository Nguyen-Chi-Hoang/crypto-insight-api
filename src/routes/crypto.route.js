const express = require('express');
const router = express.Router();
const {getPrice} = require('../controllers/crypto.controller');
const rateLimiter = require('../middlewares/rateLimiter');

router.get('/price/:symbol', rateLimiter, getPrice);

module.exports = router;