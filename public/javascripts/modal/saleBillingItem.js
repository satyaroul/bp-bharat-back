var sql = require("../db/dbconnection.js");

var BillItem = function (billItem) {
  this.bill_id = billItem.bill_id;
  this.item_name = billItem.item_name;
  this.uom = billItem.uom;
  this.pack = billItem.pack;
  this.packing_qty = billItem.packing_qty;
  this.qty_free = billItem.qty_free;
  this.rate = billItem.rate;
  this.amount = billItem.amount;
  this.discount = billItem.discount;
  this.discount_amount = billItem.discount_amount;
  this.sale_date = billItem.sale_date;
};

BillItem.getAllBillItems = function (result) {
  sql.query("Select * from BILL_ITEMS", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("BillItem : ", res);

      result(null, res);
    }
  });
};

BillItem.getBilledItemsByID = function (bill_id, result) {
  sql.query(
    "Select * from BILL_ITEMS where BILL_ID = ?",
    bill_id,
    function (err, res) {
      if (err) {
        result(null, err);
      } else if( res.length != 0){
        console.log('here')
        result(null, res);       
      } else {
        console.log('here2')
        result(null, null);
      }
    }
  );
};

BillItem.createBillItem = function (billID , newBillItem, date, updation_date, result) {
  newBillItem.forEach((element) => {
      element["bill_id"] = billID;
      element["date"] = date;
      element['updation_date'] = updation_date;
      console.log(element)
      sql.query("INSERT INTO BILL_ITEMS set ?", element, function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          console.log(res.insertId);
        //   result(null, res.insertId);
        }
      });
  });
};

module.exports = BillItem;
