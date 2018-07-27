var _ = require('underscore');
var Goods = require('../models/goods');
var Gallery = require('../models/gallery');
var Specification = require('../models/specification');
var Color = require('../models/color')

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
    var goodsDetail = {};
    console.log(id, 'id')
    if (id) {
        Goods.findById(id, function(err, goods) {
            if (err) console.log(err);
            goodsDetail.goods = goods;
            // res.status(200, 'success');
            // res.send({
            //     errorno : 0,
            //     data: goods
            // });
            // res.end();
        })
        
        Gallery.findAllById(id, function(err, gallery) {
            console.log(err, gallery);
            goodsDetail.gallery = gallery;
        })
        Specification
            .find({})
            .exec(function(err, spec) {
                console.log(spec, 'spec')
                if (err) console.log(err);
                if (spec) {
                    const specTmp = [];
                    async function specFun() {
                        return await new Promise((resolve, reject) => {
                            spec.map(function(item, index) {
                                specTmp.push(item);
                                Color
                                .find({specification_id: item.specification_id})
                                .exec(function(err, color) {
                                    specTmp[index].valueList = color;
                                    resolve(specTmp);
                                })
                            })
                        })
                    }
                
                    specFun().then(function(specs) {
                        goodsDetail.specificationList = specs;
                        res.status(200, 'success');
                        res.send({
                            errorno : 0,
                            data: goodsDetail
                        });
                    })
                    
                }
            })
    }
}


exports.gallerySave = function(req, res) {
    var galleryObj = req.body;
    var id = req.body._id || null
    var _gallery;
    if (id) {
        Gallery.findById(id, function(err, gallery) {
            if (err) {
                console.log(err)
            }
            _gallery = _.extend(gallery, galleryObj);
            _gallery.save(function(err, gallery) {
                if (err) {
                    console.log(err)
                }
                console.log(gallery, 'gallery save');
                res.send(gallery);
                res.end();
            })
        })
    } else {
        _gallery = new Gallery(galleryObj)
        _gallery.save(function(err, gallery) {
            if (err) {
                console.log(err)
            }
            console.log(gallery, 'banner save first');
            res.send(gallery);
            res.end();
        })
    }
}