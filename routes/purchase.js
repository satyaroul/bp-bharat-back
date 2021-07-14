var express = require('express');
var router = express.Router();
var PurchaseBill = require('../public/javascripts/modal/purchaseBill');



/* GET users listing. */
router.get('/', function(req, res, next) {
    PurchaseBill.getAllItem(function(err, item) {
        if (err)
          res.send(err);
        res.send(item);
      });
//   res.send('Items with a resource');
});

router.post('/newPurchase', function(req, res, next) {  
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    var dateString =
      (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
    req.body["updation_date"] = dateString; 
    PurchaseBill.createPurchaseBill(req.body, function(err, item_id) {
        if (err)
          res.send(err);
        res.send('success');
      });
//   res.send('Items with a resource');
});

module.exports = router;
