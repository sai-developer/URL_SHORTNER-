//import Url model
const Url = require('../model/url-model.js');
const short = require('short-uuid');

//This is basically your domain name
const baseUrl = process.env.BASE_URL || 'http://localhost:8500';

exports.createShortLink = async (req, res) => {
    //get the originalUrl and unique_name from the request's body
    let { url } = req.body;
console.log(url)
var urlHash=""
    try {
            const translator = short(short.constants.flickrBase58, {
                consistentLength: false,
              });
               
              // Generate a shortened v4 UUID
             urlHash= translator.new();
            const shortUrl = baseUrl + '/' + urlHash;
            urlSave  = new Url({
                url,
                shortUrl,
                urlHash
            });
            //save
            const saved = await urlSave.save();
            //return success message shortUrl
            return res.json({
                message : 'success',
                ok : true,
                url:url,
                urlHash:urlHash,
                shortUrl:shortUrl
            });
        // }
    } catch (error) {
        ///catch any error, and return server error
        return res.status(500).json({ok : false, error : 'Server error'});
    }
};


exports.openShortLink = async (req, res) => {
    console.log(req.params,"parrr",req.params.urlHash)
    //get the unique name from the req params (e.g olamide from shorten.me/olamide)
    const { urlHash } = req.params;
    console.log(urlHash,"urlHash")
    try{
      //find the Url model that has that unique_name
      let result = await Url.findOne({ urlHash });
        console.log(result,"urrrrrr")
       /** if such Url exists, redirect the user to the originalUrl 
       of that Url Model, else send a 404 Not Found Response */
        if(result){
            console.log(result,"ressss")
            return res.redirect(result.url);
        } else {
            return res.status(404).json({error : 'Not found'});
        }  
    } catch(err) {
       //catch any error, and return server error to user
        console.log(err);
        res.status(500).json({error : 'Server error'});
    } 
};
exports.deleteShortLink = async (req, res) => {
    console.log(req.params,"parrr",req.params.urlHash)
    //get the unique name from the req params (e.g olamide from shorten.me/olamide)
    const { urlHash } = req.params;
    console.log(urlHash,"urlHash")
    try{
      //find the Url model that has that unique_name
      let result = await Url.remove({ urlHash });
        // console.log(result,"urrrrrr")
       /** if such Url exists, redirect the user to the originalUrl 
       of that Url Model, else send a 404 Not Found Response */
        if(result){
            console.log(result,"ressss")
            return res.json({
                message : 'success',
                ok : true
            })

        } else {
            return res.status(404).json({error : 'Not found'});
        }  
    } catch(err) {
       //catch any error, and return server error to user
        console.log(err);
        res.status(500).json({error : 'Server error'});
    } 
};