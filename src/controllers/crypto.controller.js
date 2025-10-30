const {getCryptoPrice} = require('../services/crypto.service');

const getPrice = async (req, res, next) => {
    try {
        const {symbol} = req.params;
        if(!symbol) return res.status(400).json({error: 'symbol required'});
        const data = await getCryptoPrice(symbol.toLowerCase());
        res.json({success:true,data});
    } catch(err) {
        next(err);
    }
}

module.exports = {getPrice};