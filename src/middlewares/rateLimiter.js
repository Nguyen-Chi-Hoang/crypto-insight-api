const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60*1000,
    max: 10,
    message: 'Too much requests, please try again later.',
})

module.exports = limiter;