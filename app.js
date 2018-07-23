var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mogonStore = require('connect-mongo')(session);
var port = process.env.PORT || 8001;
var app = express();

var dbUrl = 'mongodb://localhost:27017/nodeshop';
mongoose.connect(dbUrl, { useNewUrlParser: true });

// app.set('views', path.join(__dirname, 'app/view/pages'));
// app.use(logger('dev'))
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
require('./routes/routes')(app)

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port, () => {
    console.log('listen start on port ' + port);
})