var Banner = require('../models/banner');
var Brand = require('../models/brand');
var Channel = require('../models/channel');

exports.Homepage = function(req, res) {
    var indexArrs = {};
    Banner.fetch(function (err, banner) {
        if (err) {
            console.log(err)
        }
        console.log(banner);
        indexArrs.banner = banner;
    });
    Channel.fetch(function (err, channel) {
        if (err) console.log(err);
        indexArrs.channel = channel;
    })
    Brand.fetch(function (err, brand) {
        if (err) {
            console.log(err)
        }
        console.log(brand);
        indexArrs.brand = brand;
        res.status(200, 'success');
        res.send({
            errorno : 0,
            data: indexArrs
        });
        res.end();
    });
}