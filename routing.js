var highlightCtrl = require('./controllers/highlightCtrl');

module.exports = function(app, router, dbClient)
{
    app.use('/highlight', highlightCtrl(router, dbClient));
}
