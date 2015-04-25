var express = require('express');

module.exports = function(serviceManager) {
    var create = function (req, res) {
        var sql = 'INSERT INTO contact (name, email, message) VALUES ($1::text, $2::text, $3::text)';
        var query = serviceManager.dbClient.query(sql, [req.body.name, req.body.email, req.body.message]);
        query.on('error', function(error) {
            res.json({"message": "Something went wrong, try again!"});
        });

        serviceManager.mail.sendMail({
            from: 'www-data@sc2hl.com',
            to: 'simonhosk@gmail.com',
            subject: 'SC2HL - Contact',
            text: 'Name: ' + req.body.name + '\nEmail: ' + req.body.email + '\nMessage: ' + req.body.message
        });

        res.json({"message": "Thanks for contacting us!"});
    }

    var router = express.Router();

    router.post('/', create);

    return router;
}
