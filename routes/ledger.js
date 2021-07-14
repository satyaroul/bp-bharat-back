var express = require("express");
var router = express.Router();
var Ledger = require("../public/javascripts/modal/ledgerEntry");

/* GET users listing. */
router.get("/get_account_ledger/:ac_id", function (req, res, next) {
  Ledger.getLedgerByID(req.params.ac_id, function (err, item) {
    if (err) res.send(err);
    res.send(item);
  });
  //   res.send('Items with a resource');
});

router.post("/newProduct", function (req, res, next) {
  Ledger.createItem(req.body, function (err, item_id) {
    if (err) res.send(err);
    res.send("success");
  });
  //   res.send('Items with a resource');
});

router.post("/cashPaid", function (req, res, next) {
  Ledger.cashPaid(req.body, function (err, item_id) {
    if (err) res.send(err);
    res.send("success");
  });
  //   res.send('Items with a resource');
});

module.exports = router;
