var highlightCtrl = require('./controllers/highlightCtrl');

module.exports = function(app, router)
{
    app.use('/highlight', highlightCtrl(router));
}
