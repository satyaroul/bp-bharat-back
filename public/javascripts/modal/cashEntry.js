var sql = require("../db/dbconnection.js");
var Ledger = require("../modal/ledgerEntry");

var CashEntry = function (cash) {
  this.account_holder_id = cash.account_holder_id;
  this.account_name = cash.account_name;
  this.bill_id = cash.bill_id;
  this.receipt_no = cash.receipt_no;
  this.bill_amount = cash.bill_amount;
  this.paid = cash.paid;
  this.date = cash.date;
  this.cash_in_hand = cash.cash_in_hand;
  this.isActive = cash.isActive;
};

CashEntry.totalInHand = function (result) {
  sql.query(
    "Select CASH_IN_HAND, UPDATION_DATE from CASH_ENTRY where DATE = (Select max(UPDATION_DATE) from CASH_ENTRY)",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("cash in hand for latest entry fetched ");
        result(null, res[res.length - 1]);
      }
    }
  );
};

CashEntry.cashRecived = function (receipt, result) {
  var cash_in_hand;
  var cash = receipt;
  var amount = receipt.amount;

  sql.query(
    "Select CASH_IN_HAND from CASH_ENTRY where UPDATION_DATE = (Select max(UPDATION_DATE) from CASH_ENTRY)",
    function (err, res) {
      if (err) {
        console.log("error fetching cash_in_hand: ");
        result(err, null);
      } else {
        if (res[res.length - 1]) {
          cash_in_hand = amount + res[res.length - 1].CASH_IN_HAND;
          receipt["cash_in_hand"] = cash_in_hand;
        } else {
          cash_in_hand = amount + 0;
          receipt["cash_in_hand"] = cash_in_hand;
        }
        sql.query("INSERT INTO CASH_ENTRY set ?", receipt, function (err, res) {
          if (err) {
            console.log("error2: ", err);
            // result(err, null);
          } else {
            // result(null, res.insertId);
          }
        });
        Ledger.cashRecived(cash);
        result(null, res);
      }
    }
  );
};

CashEntry.cashPaid = function (receipt, result) {
  var cash_in_hand;
  var amount = receipt.amount;
  sql.query(
    "Select CASH_IN_HAND from CASH_ENTRY where UPDATION_DATE = (Select max(UPDATION_DATE) from CASH_ENTRY)",
    function (err, res) {
      if (err) {
        console.log("error fetching cash_in_hand: ");
        result(err, null);
      } else {
        if (res[res.length - 1]) {
          cash_in_hand = res[res.length - 1].CASH_IN_HAND - amount;
          receipt["cash_in_hand"] = cash_in_hand;
        } else {
          cash_in_hand = 0 - amount;
          receipt["cash_in_hand"] = cash_in_hand;
        }
        sql.query("INSERT INTO CASH_ENTRY set ?", receipt, function (err, res) {
          if (err) {
            console.log("error2: ", err);
            // result(err, null);
          } else {
            // result(null, res.insertId);
          }
        });
        result(null, res);
      }
    }
  );
};

module.exports = CashEntry;
