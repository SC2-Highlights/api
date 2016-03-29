var express = require('express');
var Twitter = require('twitter');

module.exports = function(serviceManager) {
  var loadAll = function(req, res) {
    var client = new Twitter({
      consumer_key: serviceManager.twitter.api_key,
      consumer_secret: serviceManager.twitter.api_secret,
      access_token_key: serviceManager.twitter.access_token,
      access_token_secret: serviceManager.twitter.access_secret
    });
 
    var params = {
      screen_name: 'SC2HL',
      count: 20,
      trim_user: true,
      exclude_replies: true,
      include_rts: false
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        res.status(200).json(tweets);
      }
    });
  }

  var router = express.Router();

  router.get('/', loadAll);

  return router;
}