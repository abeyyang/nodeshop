var _ = require('underscore');
var Channel = require('../models/channel');

exports.save = function(req, res) {
    var channelObj = req.body;
    var id = req.body._id || null;
    var _channel;
    if (id) {
        Channel.findById(id, function(err, channel) {
            if (err) console.log(err);
            _channel = _.extend(channel, channelObj);
            _channel.save(function(err, channel) {
                if (err) console.log(err);
                res.send(channel);
                res.end();
            })
        })
    } else {
        _channel = new Channel({
            icon_url: channelObj.icon_url,
            name: channelObj.name,
            url: channelObj.url
        });
        _channel.save(function(err, channel) {
            if (err) console.log(err);
            console.log(channel, 'channel')
            res.send(channel);
            res.end();
        })
    }
}