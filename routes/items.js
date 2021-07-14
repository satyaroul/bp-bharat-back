var express = require('express');
var router = express.Router();
var Items = require('../public/javascripts/modal/items');



/* GET users listing. */
router.get('/', function(req, res, next) {
    Items.getAllItem(function(err, item) {
        if (err)
          res.send(err);
        res.send(item);
      });
//   res.send('Items with a resource');
});

router.post('/newProduct', function(req, res, next) {   
    Items.createItem(req.body, function(err, item_id) {
      console.log('error',err);
        if (err)
          res.send(err);
        res.send(JSON.stringify('success'));
      });
//   res.send('Items with a resource');
});

module.exports = router;
