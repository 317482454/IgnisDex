

const common = {
    dbUser: process.env.FABU_DBUSER || undefined, //数据库用户 (没有开启mongodb用户认证的可以不填写)
    dbPass: process.env.FABU_DBPWD || undefined, //数据库密码 (没有开启mongodb用户认证的可以不填写)
    dbName: process.env.FABU_DB_NAME || "ignixdex", //数据库名称
    dbHost: process.env.FABU_DB_HOST || "localhost", //数据库地址
    dbPort: process.env.FABU_DB_PORT || "27017", //数据库端口

};


module.exports = common;

