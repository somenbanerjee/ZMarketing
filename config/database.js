const mysql = require("mysql2");

//console.log(process.env);

//create the connection to database
/* const connectDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}); */

const con = mysql.createConnection({
  host: "",
  user: "root",
  password: "root",
  database: "zmarketing",
});

con.connect((error) => {
  if (error) throw error;
  console.log("DB connect");
});

module.exports = con;
