const mongoose = require('mongoose')
const Fawn = require("fawn");
const config = require("../config");


var dbUrl = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
if (config.dbUser) {
    dbUrl = `mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

console.log(dbUrl)
mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('Mongoose connection error: ' + err.message)
    } else {
        console.log('数据库连接成功')
    }
})

mongoose
    .connection
    .on('disconnected', function () {
        console.log('Mongoose connection disconnected')
    })
Fawn.init(mongoose);

module.exports = mongoose