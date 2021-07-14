var express = require('express');
var router = express.Router();
var Inventory = require('../public/javascripts/modal/inventory');



/* GET users listing. */
router.get('/totalStockInHand', function(req, res, next) {
    Inventory.getTotalStockInHand(function(err, item) {
        if (err)
          res.send(err);
        res.send(item);
      });
//   res.send('Items with a resource');
});

// router.post('/newProduct', function(req, res, next) {

//     var item = new Items(req.body);    
//     Items.createItem(req.body, function(err, item_id) {
//         if (err)
//           res.send(err);
//         res.send('success');
//       });
// //   res.send('Items with a resource');
// });

module.exports = router;
