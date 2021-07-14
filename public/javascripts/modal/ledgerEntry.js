var sql = require("../db/dbconnection.js");

var Ledger = function (ledger) {
  this.account_holder_id = ledger.account_holder_id;
  this.account_name = ledger.account_name;
  this.bill_id = ledger.bill_id;
  this.receipt_no = ledger.receipt_no;
  this.bill_amount = ledger.bill_amount;
  this.paid = ledger.paid;
  this.isActive = ledger.isActive;
};

Ledger.getLedgerByID = function (ac_id, result) {
  sql.query("Select * from LEDGER where AC_ID = ?", ac_id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Ledger.createLedgerEntry = function (bill_id, newEntry, result) {
  var current_balance;
  var total_balance;
  delete newEntry.ac_address;
  delete newEntry.ac_mobile;
  delete newEntry.taxable_amt;
  delete newEntry.cgst;
  delete newEntry.sgst;
  delete newEntry.discount;
  delete newEntry.basic_amt;

  newEntry.bill_id = bill_id;
  sql.query(
    "Select BALANCE from LEDGER where UPDATION_DATE = (Select max(UPDATION_DATE) from LEDGER) AND AC_ID = ? ",
    newEntry.ac_id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        if (res.length != 0) {
          current_balance = res[res.length - 1].BALANCE;
          total_balance = current_balance + newEntry.total_amt;
          newEntry["balance"] = total_balance;
          newEntry["bill_amount"] = newEntry.total_amt;
          delete newEntry.total_amt;
          sql.query("INSERT INTO LEDGER set ?", newEntry, function (err, res) {
            if (err) {
              console.log("error at ledgerEntry: ", err);
              // result(err, null);
            } else {
              // result(null, res.insertId);
            }
          });
        } else {
          newEntry["balance"] = newEntry.total_amt;
          newEntry["bill_amount"] = newEntry.total_amt;
          delete newEntry.total_amt;
          sql.query("INSERT INTO LEDGER set ?", newEntry, function (err, res) {
            if (err) {
              console.log("error at ledgerEntry: ", err);
              // result(err, null);
            } else {
              // result(null, res.insertId);
            }
          });
        }
      }
    }
  );
};

Ledger.cashRecived = function (cash, result) {
  cash['paid'] = cash.amount;
  delete cash.amount;
  delete cash.type;
  delete cash.cash_in_hand;
  var current_balance = 0;
  var total_balance;
  // console.log(cash);
  sql.query(
    "Select BALANCE from LEDGER where AC_ID = ? AND UPDATION_DATE = (Select max(UPDATION_DATE) from LEDGER)",
    cash.ac_id,
    function (err, res) {
      if (err) {
        console.log("error fetching ledger details at cashRecived: ", err);
        result(null, err);
      } else {
        console.log('here',res)
        if (res[res.length - 1]) {
          current_balance = res[res.length - 1].BALANCE;
          total_balance = current_balance - cash.paid;
        } else {
          total_balance = current_balance - cash.paid;
        }
        cash["balance"] = total_balance;
        sql.query("INSERT INTO LEDGER set ?", cash, function (err, res) {
          if (err) {
            console.log("error at ledgerEntry: ", err);
            // result(err, null);
          } else {
            // result(null, res.insertId);
          }
        });
      }
    }
  );
};

module.exports = Ledger;
