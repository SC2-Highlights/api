var highlightCtrl = require('./controllers/highlightCtrl');
var homepageCtrl = require('./controllers/homepageCtrl');
var eventCtrl = require('./controllers/eventCtrl');
var contactCtrl = require('./controllers/contactCtrl');
var suggestionCtrl = require('./controllers/suggestionCtrl');

module.exports = function(app, serviceManager) {
    app.use('/highlight', highlightCtrl(serviceManager));
    app.use('/blog', homepageCtrl(serviceManager));
    app.use('/event', eventCtrl(serviceManager));
    app.use('/contact', contactCtrl(serviceManager));
    app.use('/suggestion', suggestionCtrl(serviceManager));

    app.use('/', function(req, res) {
        res.sendStatus(200);
    });
}
