var _ = require('underscore');
var Banner = require('../models/banner');

exports.save = function(req, res) {
    var bannerObj = req.body;
    var id = req.body._id || null
    var _banner;
    if (id) {
        Banner.findById(id, function(err, banner) {
            if (err) {
                console.log(err)
            }
            _banner = _.extend(banner, bannerObj)
            console.log(banner, 'banner');
            _banner.save(function(err, banner) {
                if (err) {
                    console.log(err)
                }
                console.log(banner, 'banner save');
                res.send(banner);
                res.end();
            })
        })
    } else {
       _banner = new Banner({
        link: bannerObj.link,
        image_url: bannerObj.image_url,
       })
       _banner.save(function(err, banner) {
            if (err) {
                console.log(err)
            }
            console.log(banner, 'banner save first');
            res.send(banner);
            res.end();
        })
    }
}