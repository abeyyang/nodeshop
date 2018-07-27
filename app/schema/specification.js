var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var SpecificationSchema = new mongoose.Schema({
    specification_id: String,
    name: String,
    valueList: Array,
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

SpecificationSchema.pre('save', function(next) {
    console.log(this.isNew, 'this.isNew');
    if (this.isNew) {
        this.meta.createTime = this.meta.update = Date.now();
    } else {
        this.meta.updateTime = Date.now();
    }
    next();
})

module.exports = SpecificationSchema;