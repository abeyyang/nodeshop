var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var GallerySchema = new mongoose.Schema({
    img_url: String,
    goods: {
        type: ObjectId,
        ref: 'goods'
    },
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
})

GallerySchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createTime = this.meta.update = Date.now();
    } else {
        this.meta.updateTime = Date.now();
    }
    next();
});

GallerySchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateTime')
            .exec(cb)
    },
    findAllById: function(id, cb) {
        return this
            .find({goods: id})
            .exec(cb)
    }
}

module.exports = GallerySchema;