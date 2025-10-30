const express = require('express');
const router = express.Router();
const {getMetrics,resetMetrics} = require('../utils/metrics');

router.get('/',(req,res)=>{
    res.json({
        success:true,
        method:getMetrics(),
    })
})

router.delete('/', (req, res) => {
  resetMetrics();
  res.json({ success: true, message: 'Metrics reset thành công' });
});

module.exports = router;