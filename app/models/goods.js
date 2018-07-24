var mongoose = require('mongoose');
var GoodsSchema = require('../schema/goods');

var Goods = mongoose.model('goods', GoodsSchema)

module.exports = Goods;