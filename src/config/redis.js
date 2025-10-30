const {createClient} = require('redis');
const logger = require('../utils/logger');

const client = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
})
client.on('error', (err) => logger.error('Redis Client Error: ' + err));
client.connect().then(() => logger.info('SUCCESS: Redis connected')).catch((err) => logger.error('ERROR: Redsi connect failed: ' + err));

module.exports = client;