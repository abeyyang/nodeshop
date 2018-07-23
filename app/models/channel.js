var mongoose = require('mongoose');
var ChannelSchema = require('../schema/channel');

var Channel = mongoose.model('channel', ChannelSchema);

module.exports = Channel;