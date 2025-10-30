const client = require('prom-client');

const register = new client.Registry();

const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Tổng số lượng request HTTP nhận được',
    labelNames: ['method', 'route', 'status_code'],
});


const cacheHitCounter = new client.Counter({
    name: 'crypto_cache_hit_total',
    help: 'Số lần cache hit',
})

const cacheMissCounter = new client.Counter({
    name: 'crypto_cache_miss_total',
    help: 'Số lần cache miss',
})

const apiCallHistogram = new client.Histogram({
    name: 'crypto_api_call_duration_ms',
    help: 'Thời gian phản hồi API CoinGecko (ms)',
    buckets: [50,100,200,400,800,1600],
})

register.registerMetric(cacheHitCounter);
register.registerMetric(cacheMissCounter);
register.registerMetric(apiCallHistogram);
register.registerMetric(httpRequestsTotal);
client.collectDefaultMetrics({register});

module.exports = {
  cacheHitCounter,
  cacheMissCounter,
  apiCallHistogram,
  httpRequestsTotal,
  register,
};