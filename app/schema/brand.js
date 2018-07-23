var mongoose = require('mongoose');

var BrandSchema = new mongoose.Schema({
    new_pic_url: String,
    name: String,
    floor_price: String,
    app_list_pic_url: String,
    simple_desc: String,
    meta: {
        createTime: {
            type: Date,
            default: Date.now()
        },
        updateTime: {
            type: Date,
            default: Date.now()
        }
    }
});

BrandSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createTime = this.meta.update = Date.now();
    } else {
        this.meta.updateTime = Date.now();
    }
    next();
})

BrandSchema.statics = {
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
    }
}

module.exports = BrandSchema;