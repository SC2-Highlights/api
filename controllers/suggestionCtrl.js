var express = require('express');

module.exports = function(serviceManager) {
    var create = function (req, res) {
        var data = req.body.data;

        var sql = 'INSERT INTO suggestion (name, email, link, description, time_description) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)';
        var query = serviceManager.dbClient.query(sql, [data.name, data.email, data.link, data.description, data.time]);
        query.on('error', function(error) {
            res.status(400).json({"message": "Something went wrong, try again!"});
        });

        serviceManager.mail.sendMail({
            from: 'www-data@sc2hl.com',
            to: 'simonhosk@gmail.com, contactsc2hl@gmail.com, d.t.verweij@gmail.com',
            subject: 'SC2HL - Suggestion',
            text: 'Name: ' + data.name + '\nEmail: ' + data.email + '\nLink: ' + data.link + '\nTime: ' + data.time + '\nDescription: ' + data.description
        });

        res.status(200).json({"message": "Thanks for the suggestion!"});
    }

    var router = express.Router();

    router.post('/', create);

    return router;
}
