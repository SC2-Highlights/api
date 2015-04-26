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

        var sql = 'SELECT * FROM highlights JOIN events USING (event_id)'
            + ' WHERE title ILIKE $1::text OR players ILIKE $1::text OR event_name ILIKE $1::text';

        var query = serviceManager.dbClient.query(sql, ['%' + criteria + '%']);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var rate = function(req, res) {
        var id = req.params.id;
        var data = req.body.data;

        console.log(req.cookies);

        res.cookie(id, data.rating);

        res.status(200).json({"message":"success"});
    }

    var router = express.Router();

    router.get('/:id', load);
    router.get('/', loadAll);
    router.get('/event/:id', loadAllEvent);
    router.get('/search/:criteria', search);
    router.post('/:id/rate', rate);

    return router;
}
