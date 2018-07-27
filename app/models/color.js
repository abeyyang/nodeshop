var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
/**
 * [Movie description] 编译生成movie模型
 * @type {[type]} 第一个参数为这个模型的名字，第二个参数为模型骨架
 */

var ColorSchema = new mongoose.Schema({
    specification_id: String,
    value: String
 });

 var Color = mongoose.model('color', ColorSchema)

 

 module.exports = Color;