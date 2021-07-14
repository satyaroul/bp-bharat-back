var express = require("express");
var router = express.Router();
var CashEntry = require("../public/javascripts/modal/cashEntry");

router.get("/get_account_ledger/:ac_id", function (req, res, next) {
  CashEntry.getLedgerByID(req.params.ac_id, function (err, item) {
    if (err) res.send(err);
    res.send(item);
  });
  //   res.send('Items with a resource');
});

router.get("/totalCashInHand", function (req, res, next) {
  CashEntry.totalInHand(function (err, cash) {
    if (err) res.send(err);
    res.send(cash);
  });
  //   res.send('Items with a resource');
});

router.post("/cashPaid", function (req, res, next) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  var dateString =
    (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
  req.body["updation_date"] = dateString;
  CashEntry.cashPaid(req.body, function (err, item_id) {
    if (err) res.send(err);
    res.send("success");
  });
  //   res.send('Items with a resource');
});
router.post("/cashRecived", function (req, res, next) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  var dateString =
    (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
  req.body["updation_date"] = dateString;
  CashEntry.cashRecived(req.body, function (err, item_id) {
    if (err) res.send(err);
    res.send("success");
  });
  //   res.send('Items with a resource');
});

module.exports = router;
