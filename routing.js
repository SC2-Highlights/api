var highlightCtrl = require('./controllers/highlightCtrl');
var homepageCtrl = require('./controllers/homepageCtrl');
var eventCtrl = require('./controllers/eventCtrl');

module.exports = function(app, dbClient) {
    app.use('/highlight', highlightCtrl(dbClient));
    app.use('/blog', homepageCtrl(dbClient));
    app.use('/event', eventCtrl(dbClient));

    app.use('/', function(req, res) {
        res.sendStatus(200);
    });
}
