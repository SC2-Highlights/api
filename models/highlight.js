module.exports = {
    loadFromDb: function(dbClient, id) {
        var query = 'SELECT * FROM highlights WHERE highlight_id = $1::int';
        dbClient.query(
            query,
            [id],
            function(err, result) {
                if(err || !result.rows[0]) {
                    res.status(400)
                } else {
                    res.status(200).json(this.data);
                }
            }
        );
    }
}