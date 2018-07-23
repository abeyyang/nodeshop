var mongoose = require('mongoose');

var ChannelSchema = new mongoose.Schema({
    url: String,
    icon_url: String,
    name: String,
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

ChannelSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createTime = this.meta.update = Date.now();
    } else {
        this.meta.updateTime = Date.now();
    }
    next();
})

ChannelSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .limit(3)
            .sort('meta.updateTime')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = ChannelSchema;