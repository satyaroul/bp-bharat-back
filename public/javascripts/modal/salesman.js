var sql = require("../db/dbconnection.js");

var Salesman = function (salesman) {
    this.name = salesman.name;
    this.mobile = salesman.mobile;
};

Salesman.getAllSalesman = function (result) {
  sql.query("Select * from SALESMAN ", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("items : ", res);
      result(null, res);
    }
  });
};

Salesman.createSalesman = function (newSalesman, result) {
  sql.query("INSERT INTO SALESMAN set ?", newSalesman, function (err, res) {
    if (err) {
      console.log("error: ");
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

module.exports = Salesman;
