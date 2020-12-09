var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var urlSchema = new Schema({
    url: { type: String },
    urlHash: { type: String },
    shortUrl: { type: String }
    }, {
    collection: 'url'
})

var url = mongoose.model('url', urlSchema);
module.exports = url;