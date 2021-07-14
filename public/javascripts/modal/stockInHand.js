var sql = require("../db/dbconnection.js");

var Stock = function (stock) {
  this.product_name = stock.product_name;
  this.product_id = stock.product_id
  this.mfg_group_code = stock.mfg_group_code;
  this.uom = stock.uom;
  this.packing_type = stock.packing_type;
  this.packing_qty = stock.packing_qty;
  this.total_unit = stock.total_unit;
  this.isActive = stock.isActive;
};

Stock.getEntireStock = function (result) {
  sql.query("Select * from ITEMS", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("items : ", res);

      result(null, res);
    }
  });
};

Stock.updateStock = function (itemID, stockVal, purchase, result) {
  var updatedStockVal ;  
  sql.query("SELECT TOTAL_UNIT FROM ITEM_IN_STOCK WHERE PRODUCT_ID = ?", itemID, function(err, res) {
    if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
          console.log(res);
          if (purchase) {
            updatedStockVal = stockVal+res;
          } else {
            updatedStockVal = stockVal-res;
          }
          
        sql.query("UPDATE SALE SET TOTAL_UNIT ?", updatedStockVal, function (err, res) {
            if (err) {
              console.log("error: ", err);
              result(err, null);
            } else {
            //   result(null, res);
            }
          });
        console.log(res.insertId);
        result(null, res.insertId);
      }    
  });  

};

Stock.addNewItemInStock = function (newStockItem, result) {
    delete newStockItem.hsn_code;
    delete newStockItem.gst;
    delete newStockItem.cgst;
    delete newStockItem.sgst;
    delete newStockItem.final_price;
    delete newStockItem.price_per_unit;
    delete newStockItem.discount_amount;
    delete newStockItem.discount;
    delete newStockItem.isActive;
  sql.query("INSERT INTO ITEM_IN_STOCK set ?", newStockItem, function (err, res) {
    if (err) {
      console.log("error: ", err);
      // result(err, null);
    } else {
      console.log(res.insertId)
      // result(null, res.insertId);
    }
  });
};

module.exports = Stock;
