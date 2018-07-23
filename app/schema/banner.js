var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var BannerSchema = new Schema({
    link: String,
    image_url: String,
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

BannerSchema.pre('save', function(next) {
    console.log(this.isNew, 'this.isNew');
    if (this.isNew) {
        this.meta.createTime = this.meta.update = Date.now();
    } else {
        this.meta.updateTime = Date.now();
    }
    next();
})

BannerSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateTime')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

module.exports = BannerSchema;