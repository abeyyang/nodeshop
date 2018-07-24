var _ = require('underscore');
var Goods = require('../models/goods');

exports.save = function(req, res) {
    var goodsObj = req.body;
    console.log(goodsObj, 'goodsObj')
    var id = req.body._id || null;
    var _goods;
    if (id) {
        Goods.findById(id, function(err, goods) {
            if (err) console.log(err);
            _goods = _.extend(goods, goodsObj);
            _goods.save(function(err, goods) {
                if (err) console.log(err);
                res.send(goods);
                res.end();
            })
        })
    } else {
        _goods = new Goods(goodsObj);
        _goods.save(function(err, goods) {
            if (err) console.log(err);
            console.log(goods, 'goods')
            res.send(goods);
            res.end();
        })
    }
}
exports.list = function(req, res) {
    console.log(req.query, 'req.query')
    var id = req.query.brandId || null;
    var page = req.query.page || null;
    var size = req.query.size || null;
    if (id) {
        Goods.findAllById(id, page, size, function(err, goods) {
            if (err) console.log(err);
            res.status(200, 'success');
            res.send({
                errorno : 0,
                data: goods
            });
            res.end();
        })
    } 
}

exports.detail = function(req, res) {
    var id = req.query.id || null;
    if (id) {
        Goods.findById(id, function(err, goods) {
            if (err) console.log(err);
            res.status(200, 'success');
            res.send({
                errorno : 0,
                data: goods
            });
            res.end();
        })
    }
}