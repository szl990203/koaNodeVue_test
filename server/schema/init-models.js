var DataTypes = require("sequelize").DataTypes;
var _list = require("./list");
var _user = require("./user");

function initModels(sequelize) {
  var list = _list(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    list,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
