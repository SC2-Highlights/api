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

    var router = express.Router();

    router.get('/highlight/:id', staticHighlight);

    return router;
}