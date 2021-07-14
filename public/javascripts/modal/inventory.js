var sql = require("../db/dbconnection.js");

var Inventory = function (inventory) {
    this.purchase_bill_id = inventory.purchase_bill_id;

};

Inventory.getTotalStockInHand = function (result) {
  sql.query("Select * from INVENTORY", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("items : ", res);
      result(null, res);
    }
  });
};

Inventory.createNewInvetoryEntry = function (newInventoryItem, result) {
    
    var total_package = newInventoryItem.package_qty;
    var total_unit = total_package * newInventoryItem.unit_per_package;
    var loose_unit = total_unit % newInventoryItem.unit_per_package;

    newInventoryItem['total_package'] = total_package;
    newInventoryItem['total_unit'] = total_unit;
    newInventoryItem['loose_unit'] = loose_unit;


    delete newInventoryItem.package_qty
    delete newInventoryItem.package_rate;
    delete newInventoryItem.per_unit_rate;
    delete newInventoryItem.discount_amount;
    delete newInventoryItem.discount;
    delete newInventoryItem.total_rate;
    delete newInventoryItem.package_rate;

    console.log(newInventoryItem);
  sql.query("INSERT INTO INVENTORY set ?", newInventoryItem, function (err, res) {
    if (err) {
      console.log("error at Inventory Create Item ", err);
    //   result(err, null);
    } else {
    //   result(null, res.insertId);
    }
  });
};

module.exports = Inventory;
