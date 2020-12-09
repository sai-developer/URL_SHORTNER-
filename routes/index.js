var express = require('express');
var router = express.Router();
var urlShortner = require('../controller/url-controller.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/createShortLink',urlShortner.createShortLink);
router.get('/:urlHash',urlShortner.openShortLink);
router.post('/delete/:urlHash',urlShortner.deleteShortLink);
module.exports = router;
