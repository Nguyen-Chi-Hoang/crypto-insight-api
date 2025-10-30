const axios = require('axios');
// const NodeCache = require('node-cache');
// const cache = new NodeCache({stdTTL:60});
const redisClient = require('../config/redis');
const {
  logCacheHit,
  logCacheMiss,
  logApiCall,
} = require('../utils/metrics');
const {
  cacheHitCounter,
  cacheMissCounter,
  apiCallHistogram,
  httpRequestsTotal
} = require('../utils/prometheus');

const CACHE_TTL = 60;
const REFRESH_THRESHOLE = 10;

async function getCryptoPrice(symbol) {
    httpRequestsTotal.inc({
        method: 'GET',
        route: '/api/crypto/price',
        status_code: 200,
    });
    const key = `crypto:${symbol}`;
    const cached = await redisClient.get(key);
    if(cached) {
        cacheHitCounter.inc();
        logCacheHit();
        const data = JSON.parse(cached);
        const ttl = await redisClient.ttl(key);
        console.log(`[cache] TTL còn ${ttl}s cho ${key}`);
        if(ttl>0 && ttl<REFRESH_THRESHOLE) {
            console.log(`[cache] TTL sắp hết, refresh ngầm cho ${key}`);
            refreshCache(key, symbol);
        }
        return data;
    }
    cacheMissCounter.inc();
    logCacheMiss();
    return await refreshCache(key, symbol);
}

async function refreshCache(key, symbol) {
    const start = Date.now();
    const endTimer = apiCallHistogram.startTimer();
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`;
        const {data} = await axios.get(url);
        const duration = Date.now() - start;
        await redisClient.setEx(key, CACHE_TTL, JSON.stringify(data));
        logApiCall(duration);
        console.log(`[cache] 🔄 Cache refreshed cho ${key}`);
    } catch(err) {
        refreshCache(key, symbol);
    } finally {
        endTimer(); // 👈 kết thúc đo, ghi histogram
    }
}

module.exports = { getCryptoPrice };