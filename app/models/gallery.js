var mongoose = require('mongoose');
var GallerySchema = require('../schema/gallery');

var Gallery = mongoose.model('gallery', GallerySchema);

module.exports = Gallery;