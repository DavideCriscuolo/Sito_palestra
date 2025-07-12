const mysql = require("mysql2");

const credentials = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "gym",
};

const connection = mysql.createConnection(credentials);

console.log(connection);

connection.connect((err) => {
  if (err) {
    console.log(err.sqlMessage);
  } else {
    console.log("Connection Success");
  }
});
module.exports = connection;
