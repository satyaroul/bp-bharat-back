var sql = require("../db/dbconnection.js");
var BillItem = require("./saleBillingItem.js");
var Ledger = require("./ledgerEntry.js");

var Bill = function (bill) {
  this.bill_id = bill.bill_id;
  This.ac_id = bill.ac_id;
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

Bill.getAllBill = function (result) {
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

Bill.getBillCount = function (result) {
  sql.query("Select count(*) as BillCount from SALE", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("items : ", res);

      result(null, res);
    }
  });
};

Bill.getBillByID = function (bill_id, result) {
  sql.query(
    "Select * from SALE where BILL_ID = ? ",
    bill_id,
    function (err, bill) {
      if (err) {
        // console.log("error: ", err);
        result(null, err);
      } else {
        result(null, bill);
      }
    }
  );
};

Bill.createBill = function (newEntry, result) {
  var bill_item = newEntry.bill_items;

  delete newEntry.bill_items;
  console.log(newEntry)
  sql.query("INSERT INTO SALE set ?", newEntry, function (err, res) {
    if (err) {
      console.log("error occurred in saleBilling Modal1");
      result(err, "error");
    } else {
      BillItem.createBillItem(newEntry.bill_id ,bill_item, newEntry.date, newEntry.updation_date);
      result(null, res);
      Ledger.createLedgerEntry(newEntry.bill_id,newEntry);
    }
  });
};

module.exports = Bill;
