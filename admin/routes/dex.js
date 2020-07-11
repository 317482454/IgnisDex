var express = require('express');
var router = express.Router();
var moment = require('moment');
var axios = require('axios');
var usdt = require('./model/dex/usdt');
var usdtTrades = require('./model/dex/usdtTrades');
let api = "https://testnode7.ardor.tools/nxt"

router.get('/', async function (req, res, next) {
    let list = []
    let usdtModel = await usdt.usdt.find().sort({createAt: -1}).limit(1)

    if (usdtModel.length != 0) {
        list.push({
            txt: "usdt",
            model: usdtModel[0]
        })
    }
    res.send(list)
});
router.get('/dex', async function (req, res, next) {
    let type = req.query.type || 1;
    let list = []

    if (type == "USDT") {
        list = await usdt.usdt.find()
    }
    let listModel = []

    list.forEach(item => {
        listModel.push([
            parseInt(item.time) * 1000,
            parseFloat(item.opening),
            parseFloat(item.highest),
            parseFloat(item.opening),
            parseFloat(item.closing),
            parseFloat(item.closingHebe),
        ])
    })
    if (listModel.length == 1) {
        let opening = parseFloat(listModel[0][1]);
        listModel.unshift([
            1584806400000,
            opening,
            opening,
            opening,
            opening,
            0
        ])
    }
    res.send(listModel)
});


const Fawn = require('fawn');

let time = 1514296800000;

let usdtAsset = "7187347961284359441"
let usdts = 1;
let usdtdecimas = 6;
for (let i = 0; i < (6 - usdtdecimas); i++) {
    usdts = usdts + "0"
}

function usdtDex() {
    let start = parseInt(moment().startOf('day').format('X'));
    let end = parseInt(moment().endOf('day').format('X'));
    axios.get(api + "?requestType=getTrades&asset=" + usdtAsset + "&firstIndex=0&lastIndex=100&chain=2", {timeout: 5000}).then(
        async res => {
            console.log('获取数据usdt');
            if (res.data.trades) {
                let trades = res.data.trades.reverse()
                for (let i = 0; i < trades.length; i++) {
                    let item = trades[i]
                    let times = parseInt((item.timestamp + ((time - 500) / 1000)));
                    let order = item.seller + item.bidOrderFullHash + item.buyer + item.askOrderFullHash;
                    if (times >= start && times < end) {
                        let model = await usdtTrades.usdtTrades.findOne({
                            order: order
                        })
                        if (model) {
                        } else {
                            console.log('插入usdt订单数据开始');
                            //插入订单数据开始
                            let usdtTrade = new usdtTrades.usdtTrades();
                            usdtTrade.time = times;
                            usdtTrade.price = toFn(decimals(item.quantityQNT
                                , usdtdecimas) / (decimals(item.quantityQNT
                                , usdtdecimas) * item.priceNQTPerShare/1000000) * usdts, 6)//eth价格
                            usdtTrade.sum = toFn(decimals(item.quantityQNT, usdtdecimas), 6)//eth数量
                            usdtTrade.hebeSum = toFn(decimals1(item.quantityQNT, item.priceNQTPerShare/1000000, usdtdecimas), 2);//hebe数量
                            usdtTrade.tradeType = item.tradeType;
                            usdtTrade.model = JSON.stringify(item);
                            usdtTrade.order = order;
                            var task = Fawn.Task();

                            var result = await task
                                .save(usdtTrade)
                                .run({useMongoose: true});

                            //插入订单数据结束

                            //插入每日数据

                            let model1 = await usdt.usdt.findOne({
                                time: start
                            })
                            if (model1) {
                                let updateModel = {}
                                updateModel.closing = usdtTrade.price
                                updateModel.closingSum = model1.closingSum + usdtTrade.sum
                                updateModel.closingHebe = model1.closingHebe + usdtTrade.hebeSum
                                //最低价格
                                if (model1.lowest < usdtTrade.price) {
                                    updateModel.lowest = usdtTrade.price
                                }
                                //最高价格
                                updateModel.price = usdtTrade.price

                                //最高价格
                                if(usdtTrade.price>model1.highest){
                                    updateModel.highest = usdtTrade.price
                                }
                                await usdt.usdt.updateOne({
                                    time: start
                                }, updateModel);
                            }
                            else {
                                let usdtModel = new usdt.usdt();
                                usdtModel.time = start;
                                usdtModel.opening = usdtTrade.price;//开盘价格
                                usdtModel.lowest = usdtTrade.price;//最低价格
                                usdtModel.highest = usdtTrade.price;//最高价格
                                usdtModel.closing = usdtTrade.price;//收盘价格eth
                                usdtModel.closingSum = usdtTrade.sum;//收盘eth数量
                                usdtModel.closingHebe = usdtTrade.hebeSum;//收盘hebe数量
                                var task = Fawn.Task();

                                var result = await task
                                    .save(usdtModel)
                                    .run({useMongoose: true});
                            }
                        }
                    }

                }
            }
            setTimeout(() => {
                usdtDex()
            }, 10000)
        }).catch(err => {
        setTimeout(() => {
            usdtDex()
        }, 10000)
    })
}

usdtDex()




function toFn(num, decimals) {
    let val1 = 0;
    // 判断是否数字
    if (typeof (num) == "number") {
        val1 = num;
    } else {
        val1 = parseFloat(num);
    }

    decimals = (decimals === undefined ? 2 : decimals); // bitNum默认值为2
    return val1.toFixed(decimals);
}

function decimals(sum, decimals) {
    return sum / Math.pow(10, decimals)
}

function decimals1(sum, prcie, decimals) {
    if (decimals <= 6) decimals = 8
    return sum / Math.pow(10, decimals) * prcie
}

module.exports = router;
