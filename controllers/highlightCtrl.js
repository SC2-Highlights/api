var express = require('express');

module.exports = function(dbClient) {
    var load = function (req, res) {
        var id = req.params.id;

        var sql = 'SELECT * FROM highlights JOIN events USING (event_id) WHERE highlight_id = $1::int';
        var query = dbClient.query(sql, [id]);

        query.on('end', function(result) {
            res.status(200).json(result.rows[0]);
        });
    }

    var loadAll = function(req, res) {
        var sql = 'SELECT * FROM highlights JOIN events USING (event_id)';
        var query = dbClient.query(sql);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var loadAllEvent = function(req, res) {
        var id = req.params.id;

        var sql = 'SELECT * FROM highlights JOIN events USING (event_id) WHERE event_id = $1::int';
        var query = dbClient.query(sql, [id]);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var router = express.Router();

    router.get('/:id', load);
    router.get('/', loadAll);
    router.get('/event/:id', loadAllEvent);

    return router;
}
