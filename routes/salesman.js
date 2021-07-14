var express = require('express');
var router = express.Router();
var Salesman = require('../public/javascripts/modal/salesman.js');



/* GET users listing. */
router.get('/', function(req, res, next) {
    Salesman.getAllSalesman(function(err, item) {
        if (err)
          res.send(err);
        res.send(item);
      });
//   res.send('Items with a resource');
});

router.post('/newSalesman', function(req, res, next) {   
    Salesman.createSalesman(req.body, function(err, salesman_id) {
        if (err)
          res.send(err);
        res.send('success');
      });
//   res.send('Items with a resource');
});

module.exports = router;