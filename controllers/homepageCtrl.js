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
        var sql = "SELECT homepage_post.homepage_post_id, homepage_post.heading, homepage_post.type, homepage_post.timestamp, homepage_post.link, homepage_post.content, homepage_post.deleted, homepage_post.preview, highlights.yt_url FROM homepage_post LEFT JOIN highlights ON homepage_post.link LIKE '/highlight/' || highlights.highlight_id";
        var query = serviceManager.dbClient.query(sql);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var router = express.Router();

    router.get('/:id', loadPost);
    router.get('/', loadAllPost);

    return router;
}
