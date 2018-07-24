var _ = require('underscore');
var Brand = require('../models/brand');

exports.save = function(req, res) {
    var brandObj = req.body;
    console.log(brandObj, 'brandObj')
    var id = req.body._id || null;
    var _brand;
    if (id) {
        Brand.findById(id, function(err, brand) {
            if (err) console.log(err);
            _brand = _.extend(brand, brandObj);
            _brand.save(function(err, brand) {
                if (err) console.log(err);
                res.send(brand);
                res.end();
            })
        })
    } else {
        _brand = new Brand({
            new_pic_url: brandObj.new_pic_url,
            name: brandObj.name,
            floor_price: brandObj.floor_price,
            app_list_pic_url: brandObj.app_list_pic_url,
            simple_desc: brandObj.simple_desc
        });
        _brand.save(function(err, brand) {
            if (err) console.log(err);
            console.log(brand, 'brand')
            res.send(brand);
            res.end();
        })
    }
}
exports.detail = function(req, res) {
    var id = req.query.id || null;
    if (id) {
        Brand.findById(id, function(err, brand) {
            if (err) console.log(err);
            res.status(200, 'success');
            res.send({
                errorno : 0,
                data: brand
            });
            res.end();
        })
    }
}