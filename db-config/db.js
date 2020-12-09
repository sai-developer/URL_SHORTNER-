var mongoose = require('mongoose');

var mongoUrl = "mongodb://localhost:27017/urlshortner";

exports.PORT = 8500;
exports.mongoUrl = "mongodb://localhost:27017/urlshortner";

//MongoDB connection
exports.connectDB = function (cb) {
    mongoose.connect(mongoUrl,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            console.log(new Date() + ':Error connecting to here: ' + mongoUrl + '. ' + err);
            cb(err);
        } else {
            console.log(new Date() + ':Successfully connected to: ' + mongoUrl);
            cb(null);
        }
    });
}