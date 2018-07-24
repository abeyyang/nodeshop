var HomePage = require('../app/routes/HomePage');
var Banner = require('../app/routes/banner');
var Brand = require('../app/routes/brand');
var Channel = require('../app/routes/channel');
var Goods = require('../app/routes/goods');

module.exports = function(app) {
    app.get('/api/index/index', HomePage.Homepage);
    app.get('/api/brand/detail', Brand.detail);
    app.post('/admin/banner/new', Banner.save);
    app.post('/admin/brand/new', Brand.save);
    app.post('/admin/channel/new', Channel.save);
    app.get('/api/goods/list', Goods.list);
    app.post('/admin/goods/new', Goods.save)
}