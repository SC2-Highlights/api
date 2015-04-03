var pg = require('pg');

module.exports = {
    connect: function (credentials) {
        this.dbClient = new pg.Client(credentials);
        this.dbClient.connect();
    },
    query: function (sql, params) {
        return this.dbClient.query(
            sql,
            params,
            function(err, result) {
                if(err) {

                }
            }
        );
    },
    data:{}
}