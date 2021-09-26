require('dotenv').config()
const env = process.env;

const development = {
	username: env.DB_USER,
	password: env.DB_PASS,
	database: env.DB,
	host: env.DB_HOST,
	dialect: "mysql",
	//port: env.MYSQL_PORT
  };

  module.exports = { development }
