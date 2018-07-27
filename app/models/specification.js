var mongoose = require('mongoose');
var SpecificationSchema = require('../schema/specification');

var Specification = mongoose.model('specification', SpecificationSchema);

module.exports = Specification;
