var express = require('express');

module.exports = function(serviceManager) {
    var loadPost = function (req, res) {
        var id = req.params.id;

        var sql = 'SELECT * FROM homepage_post WHERE homepage_post_id = $1::int AND deleted IS FALSE';
        var query = serviceManager.dbClient.query(sql, [id]);

        query.on('end', function(result) {
            res.status(200).json(result.rows[0]);
        });
    }

    var loadAllPost = function(req, res) {
        var sql = "SELECT homepage_post.*, highlights.yt_url FROM homepage_post LEFT JOIN highlights ON homepage_post.link LIKE '/highlight/' || highlights.highlight_id WHERE homepage_post.deleted IS FALSE";
        var query = serviceManager.dbClient.query(sql);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var loadTopHighlight = function(req, res) {
    	var limit = req.params.limit;

    	var sql = "SELECT highlight_id, title, date_added, yt_url, rating FROM highlights ORDER BY rating DESC LIMIT $1::int";

    	var query = serviceManager.dbClient.query(sql, [limit]);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var loadRecentHighlight = function(req, res) {
    	var limit = req.params.limit;

    	var sql = "SELECT highlight_id, title, date_added, yt_url, rating FROM highlights ORDER BY date_added DESC LIMIT $1::int";

    	var query = serviceManager.dbClient.query(sql, [limit]);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var loadRandomHighlight = function(req, res) {
    	var limit = req.params.limit;

    	var sql = "SELECT highlight_id, title, date_added, yt_url, rating FROM highlights ORDER BY random() LIMIT $1::int";

    	var query = serviceManager.dbClient.query(sql, [limit]);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var router = express.Router();

    router.get('/:id', loadPost);
    router.get('/', loadAllPost);
    router.get('/highlight/top/:limit', loadTopHighlight);
    router.get('/highlight/recent/:limit', loadRecentHighlight);
    router.get('/highlight/random/:limit', loadRandomHighlight);

    return router;
}
