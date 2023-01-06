module.exports = Object.freeze({
  DB_PORT: process.env.MYSQLPORT || 7981,
  DB_HOST: process.env.MYSQLHOST || "containers-us-west-197.railway.app",
  DB_USER: process.env.MYSQLUSER || "root",
  DB_PASS: process.env.MYSQLPASSWORD || "Z0rZaCSyy0JgoIaaH7W9",
  DB_DATABASE:  process.env.MYSQLDATABASE || "railway",
}) 


