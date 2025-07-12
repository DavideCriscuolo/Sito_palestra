const connection = require("./../db/conncetion");

const index = (req, res) => {
  const sql = "SELECT * FROM iscritti;";

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        err: err.message,
      });
    }
    console.log(results);
    res.json(results);
  });
};

module.exports = {
  index,
};
