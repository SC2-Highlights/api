var express = require('express');

module.exports = function(serviceManager) {
    var load = function (req, res) {
        var id = req.params.id;

        var sql = 'SELECT * FROM highlights JOIN events USING (event_id) WHERE highlight_id = $1::int';
        var query = serviceManager.dbClient.query(sql, [id]);

        query.on('end', function(result) {
            res.status(200).json(result.rows[0]);
        });
    }

    var loadAll = function(req, res) {
        var sql = 'SELECT * FROM highlights JOIN events USING (event_id)';
        var query = serviceManager.dbClient.query(sql);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var loadAllEvent = function(req, res) {
        var id = req.params.id;

        var sql = 'SELECT * FROM highlights JOIN events USING (event_id) WHERE event_id = $1::int';
        var query = serviceManager.dbClient.query(sql, [id]);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var search = function(req, res) {
        var criteria = req.params.criteria;


    }

    var router = express.Router();

    router.get('/:id', load);
    router.get('/', loadAll);
    router.get('/event/:id', loadAllEvent);

    return router;
}
