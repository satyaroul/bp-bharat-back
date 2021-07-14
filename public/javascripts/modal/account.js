var sql = require("../db/dbconnection.js");

var Account = function (account) {
  this.product_name = item.product_name;
  this.mfg_group_code = item.mfg_group_code;
  this.uom = item.uom;
  this.packing_type = item.packing_type;
  this.packing_qty = item.packing_qty;
  this.hsn_code = item.hsn_code;
  this.gst = item.gst;
  this.cgst = item.cgst;
  this.sgst = item.sgst;
  this.discount = item.discount;
  this.discount_amount = item.discount_amount;
  this.price_per_unit = item.price_per_unit;
  this.final_price = item.final_price;
  this.isActive = item.isActive;
};

Account.getAllAccount = function (result) {
  sql.query("Select * from ACCOUNT_HOLDERS", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("items : ", res);
      result(null, res);
    }
  });
};

Account.createAccount = function (newAccount, result) {
  sql.query("INSERT INTO ACCOUNT_HOLDERS set ?", newAccount, function (err, res) {
    if (err) {
      console.log("error: ");
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

module.exports = Account;
