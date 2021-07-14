var express = require("express");
var router = express.Router();
var Bill = require("../public/javascripts/modal/saleBilling.js");
var Bill_items = require("../public/javascripts/modal/saleBillingItem.js");

router.get("/", function (req, res, next) {
  Bill.getAllBill(function (err, allBill) {
    if (err) res.send(err);
    res.send(allBill);
  });
});

router.get("/count", function (req, res, next) {
  console.log("here")
  Bill.getBillCount(function (err, count) {
    if (err) res.send(err);
    res.send(count);
  });
});

router.post("/sale_entry", function (req, res, next) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  var dateString =
    (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
  req.body["updation_date"] = dateString;
  // var item = new Items(req);
  console.log(req.body);
  Bill.createBill(req.body, function (err, item_id) {
    console.log('error',err);
    if (err) res.send('No Record Found');
    res.status(201).send(JSON.stringify('Created'));
  });
    // res.send('Items with a resource');
});

router.get("/get_a_bill/:billId", function (req, res, next) {
  let bill_details;
  let bill_items;
  Bill.getBillByID(req.params.billId, function (err, bill_data) {
    if (!err) {
      bill_details = bill_data[0];
      Bill_items.getBilledItemsByID(
        req.params.billId,
        function (err, bill_item_data) {
          if (!err && bill_item_data != null) {
            bill_items = bill_item_data;
            bill_details["BILL_ITEMS"] = bill_items;
            res.send(bill_details);
          } else if(bill_item_data == null) {
            res.send('No BIll Item found for Bill No.'+req.params.billId)
          }
        }
      );
    } else {
      res.send('No Record Found Bill No.'+ req.params.billId)
    }
  });
});

module.exports = router;
