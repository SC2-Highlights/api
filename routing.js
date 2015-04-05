var highlightCtrl = require('./controllers/highlightCtrl');
var homepageCtrl = require('./controllers/homepageCtrl');
var eventCtrl = require('./controllers/eventCtrl');

module.exports = function(app, router, dbClient)
{
    app.use('/highlight', highlightCtrl(router, dbClient));
    app.use('/blog', homepageCtrl(router, dbClient));
    app.use('/event', eventCtrl(router, dbClient));
}
