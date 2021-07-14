var express = require('express');
var router = express.Router();
var Account = require('../public/javascripts/modal/account');



/* GET users listing. */
router.get('/', function(req, res, next) {
    Account.getAllAccount(function(err, accounts) {
        if (err)
          res.send(err);
        res.send(accounts);
      });
});

router.post('/newAccount', function(req, res, next) {   
    Account.createAccount(req.body, function(err, item_id) {
        if (err)
          res.send(err);
        res.send(JSON.stringify('success'));
      });
});

module.exports = router;
