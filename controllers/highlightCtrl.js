module.exports = function(router, dbClient) {
    var load = function (req, res) {
        var id = req.params.id;

        var sql = 'SELECT * FROM highlights JOIN events USING (event_id) WHERE highlight_id = $1::int';
        var query = dbClient.query(sql, [id]);

        query.on('end', function(result) {
            res.status(200).json(result.rows[0]);
        })
    }

    router.get('/:id', load);

    return router;
}
