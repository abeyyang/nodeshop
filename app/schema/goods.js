var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var GoodsSchema = new mongoose.Schema({
    list_pic_url: String,
    name: String,
    retail_price: String,
    goods_brief: String,
    brand: {
        type: ObjectId,
        ref: 'Brand'
    },
    meta: {
        createTime: {
            createTime: {
                type: Date,
                default: Date.now()
            }
        },
        updateTime: {
            type: Date,
            default: Date.now()
        }
    }
});

GoodsSchema.pre('save', function(next) {
    console.log(this.isNew, 'this.isNew');
    if (this.isNew) {
        this.meta.createTime = this.meta.update = Date.now();
    } else {
        this.meta.updateTime = Date.now();
    }
    next();
})

GoodsSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateTime')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    },
    findAllById: function(id, page, size, cb) {
        var skipSize = size*(page-1);
        console.log(skipSize, 'skipSize')
        return this
            .find({brand: id})
            .skip(parseInt(skipSize))
            .limit(parseInt(size))
            .exec(cb)
    }
}

module.exports = GoodsSchema;