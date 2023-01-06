module.exports = Object.freeze({
  DB_PORT: process.env.MYSQLPORT || 7981,
  DB_HOST: process.env.MYSQLHOST || "localhost",
  DB_USER: process.env.MYSQLUSER || "root",
  DB_PASS: process.env.MYSQLPASSWORD || "Meta1001",
  DB_DATABASE:  process.env.MYSQLDATABASE || "UTN",
}) 


