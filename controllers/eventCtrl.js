var express = require('express');

module.exports = function(dbClient) {
    var load = function (req, res) {
        var id = req.params.id;

        var sql = 'SELECT * FROM events WHERE event_id = $1::int';
        var query = dbClient.query(sql, [id]);

        query.on('end', function(result) {
            res.status(200).json(result.rows[0]);
        });
    }

    var loadAll = function(req, res) {
        var sql = 'SELECT * FROM events';
        var query = dbClient.query(sql);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var router = express.Router();

    router.get('/:id', load);
    router.get('/', loadAll);

    return router;
}
