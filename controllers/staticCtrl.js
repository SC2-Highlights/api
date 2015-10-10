var express = require('express');
var swig = require('swig');

module.exports = function(serviceManager) {

	var staticHighlight = function(req, res) {
		var id = req.params.id;

        var sql = 'SELECT * FROM highlights JOIN events USING (event_id) WHERE highlight_id = $1::int';
        var query = serviceManager.dbClient.query(sql, [id]);

        query.on('end', function(result) {
            res.render('highlight', { 
            	title: result.rows[0].title,
            	yt: result.rows[0].yt_url,
            	description: result.rows[0].description
            });
        });
	}

    var staticReplaySite = function(req, res) {
        res.render('submitReplay', {
            title: 'SC2HL - Submit your replay',
            description: 'Here you can submit your replays for our top community highlights series.'
        });
    }

    var staticContestSite = function(req, res) {
        res.render('contest', {
            title: 'SC2HL - WCS Grandfinals Video Contest',
            description: 'Submit your video by October 29th. $200 in prizes.'
        });
    }

    var router = express.Router();

    router.get('/highlight/:id', staticHighlight);
    router.get('/submitreplay', staticReplaySite);
    router.get('/contest', staticContestSite);

    return router;
}