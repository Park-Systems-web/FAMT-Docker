const fs = require("fs");

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql2/promise");

const asiaPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "asia",
  connectionLimit: 30,
});

const koreaPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "korea",
  connectionLimit: 30,
});
const japanPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "japan",
  connectionLimit: 30,
});
const usPool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "us",
  connectionLimit: 30,
});
const europePool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: "europe",
  connectionLimit: 30,
});

module.exports.asiaPool = asiaPool;
module.exports.koreaPool = koreaPool;
module.exports.japanPool = japanPool;
module.exports.usPool = usPool;
module.exports.europePool = europePool;
