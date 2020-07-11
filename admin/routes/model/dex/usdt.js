const mongoose = require('../../helper/db')
const Schema = mongoose.Schema

var usdtSchema = {
    time: String,//时间
    opening: String,//开盘价格
    lowest: String,//最低价格
    highest: String,//最高价格
    closing: String,//收盘价格eth
    closingSum: Number,//收盘eth数量
    closingHebe: Number,//收盘hebe数量
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date
    }
}

module.exports = {
    usdt: mongoose.model('usdt', new Schema(usdtSchema)),
    usdtSchema: usdtSchema
}
