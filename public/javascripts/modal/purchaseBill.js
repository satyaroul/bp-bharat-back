var sql = require("../db/dbconnection.js");
var PurchaseItems = require('../modal/purchaseBillItem.js');

var PurchaseBill = function (bill) {
    this.bill_id = bill.bill_id;
    this.ac_name = bill.ac_name;
    this.date = bill.date;
    this.ac_address = bill.ac_address;
    this.ac_mobile = bill.ac_mobile;
    this.taxable_amt = bill.taxable_amt;
    this.gst = bill.gst;
    this.cgst = bill.cgst;
    this.sgst = bill.sgst;
    this.discount_amount = bill.discount_amount;
    this.total_amount = bill.total_amount;
};

PurchaseBill.getAllBill = function (result) {
  sql.query("Select * from SALE", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("items : ", res);

      result(null, res);
    }
  });
};

PurchaseBill.getBillByID = function (bill_id, result) {
  sql.query(
    "Select * from SALE where BILL_ID = ? ",
    bill_id,
    function (err, bill) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, bill);
      }
    }
  );
};

PurchaseBill.createPurchaseBill = function (newPurchase, result) {
  var purchaseItem = newPurchase.bill_items
  delete newPurchase.bill_items;
  sql.query("INSERT INTO PURCHASE set ?", newPurchase, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      PurchaseItems.createPurchaseItem(newPurchase.mfg_group_code, res.insertId, newPurchase.purchase_bill_no, newPurchase.updation_date ,purchaseItem);
      result(null, res.insertId);
    }
  });
};

module.exports = PurchaseBill;
