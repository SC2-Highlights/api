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
        var sql = 'SELECT * FROM highlights JOIN events USING (event_id) WHERE deleted IS FALSE';
        var query = serviceManager.dbClient.query(sql);

        query.on('end', function(result) {
            res.status(200).json(result.rows);
        });
    }

    var loadAllEvent = function(req, res) {
        var id = req.params.id;

        var sql = 'SELECT * FROM highlights JOIN events USING (event_id) WHERE event_id = $1::int AND deleted IS FALSE';
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
        var rating = req.body.rating;

        if(rating != 1 && rating != 2 && rating != 3 && rating != 4 && rating != 5){
            res.status(400).json({"message":"failure"});
            return;
        }

        if(typeof req.cookies[id] !== 'undefined' && req.cookies[id] !== null){
            if(req.cookies[id] == rating){
                res.status(200).json({"message":"successs"});
                return;
            }

            var sql = 'UPDATE highlights SET rate' + req.cookies[id] + ' = rate' + req.cookies[id] + ' - 1 WHERE highlight_id = $1::int';
            serviceManager.dbClient.query(sql, [id]);
        }

        var sql = 'UPDATE highlights SET rate' + rating + ' = rate' + rating + ' + 1 WHERE highlight_id = $1::int';
        serviceManager.dbClient.query(sql, [id]);

        var sql = 'SELECT * FROM highlights WHERE highlight_id = $1::int';
        var query = serviceManager.dbClient.query(sql, [id]);

        query.on('end', function(result) {

            var highlight = result.rows[0];

            var voteCount = highlight.rate1 + highlight.rate2 + highlight.rate3 + highlight.rate4 + highlight.rate5;
            var weight = highlight.rate1 + highlight.rate2 * 2 + highlight.rate3 * 3 + highlight.rate4 * 4 + highlight.rate5 * 5;
            var newRating = (weight / voteCount).toFixed(1);

            var sql = 'UPDATE highlights SET rating = $1 WHERE highlight_id = $2::int';
            serviceManager.dbClient.query(sql, [newRating, id]);
        });

        res.cookie(id, rating);

        res.status(200).json({"message":"success"});
    }

    var router = express.Router();

    router.get('/:id', load);
    router.get('/', loadAll);
    router.get('/event/:id', loadAllEvent);
    router.get('/search/:criteria', search);
    router.put('/:id', rate);

    return router;
}
