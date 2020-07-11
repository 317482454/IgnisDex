const mongoose = require('../../helper/db')
const Schema = mongoose.Schema

var usdtTradesSchema = {
    time: String,//时间
    price: Number,//eth价格
    sum: Number,//eth数量
    hebeSum: Number,//hebe数量
    order: String,//交易hash
    tradeType: String,//交易类型
    model: String,//对象
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date
    }
}

module.exports = {
    usdtTrades: mongoose.model('usdtTrades', new Schema(usdtTradesSchema)),
    usdtTradesSchema: usdtTradesSchema
}
