const express = require('express');
const router = express.Router();
const { register } = require('../utils/prometheus');

router.get('/', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

module.exports = router;
