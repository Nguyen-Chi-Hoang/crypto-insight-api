require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const cryptoRoutes = require('./routes/crypto.route');
const metricsRoutes = require('./routes/metrics.route');
const prometheusRoute = require('./routes/metrics.prom.route');
const {getCryptoPrice} = require('./services/crypto.service');
const errorHandler = require('./middlewares/errorHandler');
const cron = require('node-cron');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/crypto', cryptoRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/metrics', prometheusRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
cron.schedule("*/1 * * * *", async () => {
  const coins = ["bitcoin", "ethereum"];
  for (const coin of coins) {
    try {
      await getCryptoPrice(coin); // dùng lại service, tránh lặp logic
      console.log(`[Cron] Refreshed cache for ${coin}`);
    } catch (err) {
      console.error(`[Cron] Failed to refresh ${coin}: ${err.message}`);
    }
  }
});

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));