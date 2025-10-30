const metrics = {
    cacheHit:0,
    cacheMiss:0,
    apiCall:0,
    totalResponseTime:0,
    request:0,
}

function logCacheHit() {
    metrics.cacheHit++;
}

function logCacheMiss() {
  metrics.cacheMiss++;
}

function logApiCall(duration) {
    metrics.apiCall++;
    metrics.totalResponseTime+=duration;
    metrics.request++;
}

function getMetrics() {
    const avgResponseTime = metrics.request>0?(metrics.totalResponseTime/metrics.request).toFixed(2):0;
    return {
        ...metrics,
        avgResponseTime: `${avgResponseTime}ms`,
    }
}

function resetMetrics() {
  metrics.cacheHit = 0;
  metrics.cacheMiss = 0;
  metrics.apiCall = 0;
  metrics.totalResponseTime = 0;
  metrics.requests = 0;
}

module.exports = {
    logCacheHit,
    logCacheMiss,
    logApiCall,
    getMetrics,
    resetMetrics,
}