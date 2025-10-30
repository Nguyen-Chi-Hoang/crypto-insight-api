const logger = require('../utils/logger');

module.exports = (error,req,res,next) => {
    logger.error(error.message);
    res.status(500).json({error: 'Internal Server Error'});
}