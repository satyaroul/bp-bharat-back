var sql = require("../db/dbconnection.js");
var Inventory = require("../modal/inventory.js");

var PurchaseItem = function (bill) {
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
  this.bill_items = new BillItem(bill.bill_items);
};

PurchaseItem.getAllBill = function (result) {
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

PurchaseItem.getBillByID = function (bill_id, result) {
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

PurchaseItem.createPurchaseItem = function (
  mfg_code,
  bill_id,
  bill_no,
  updation_date,
  newPurchaseItem,
  result
) {
  newPurchaseItem.forEach((product) => {
    product["purchase_bill_id"] = bill_id;
    product["purchase_bill_no"] = bill_no;
    product["updation_date"] = updation_date;
    sql.query("INSERT INTO PURCHASE_ITEMS set ?", product, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        product['mfg_group_code'] = mfg_code;
        Inventory.createNewInvetoryEntry(product);
        // result(null, "success");
      }
    });
  });
};

module.exports = PurchaseItem;
