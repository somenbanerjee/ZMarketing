const mysql = require("mysql2");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

con.connect((error) => {
  if (error) throw error;
  console.log("DB connect");
});

module.exports = con;
