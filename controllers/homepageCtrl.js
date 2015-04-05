var express = require('express');

module.exports = function(dbClient) {
    var loadPost = function (req, res) {
        var id = req.params.id;

        var sql = 'SELECT * FROM homepage_post WHERE homepage_post_id = $1::int AND deleted IS FALSE';
        var query = dbClient.query(sql, [id]);

        query.on('end', function(result) {
            res.status(200).json(result.rows[0]);
        });
    }

    var loadAllPost = function(req, res) {
        var sql = 'SELECT * FROM homepage_post WHERE deleted IS FALSE';
        var query = dbClient.query(sql);

        console.log('loadallpost');

        query.on('end', function(result) {
            console.log(result.rows);
            res.status(200).json(result.rows);
        });
    }

    var router = express.Router();

    router.get('/:id', loadPost);
    router.get('/', loadAllPost);

    return router;
}
