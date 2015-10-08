var express = require('express');

module.exports = function(serviceManager) {

	var checkForYtUrl = function(url) {
		var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
   		return (url.match(p)) ? RegExp.$1 : false;
	}

	var submitcontestvideo = function(req, res) {
		var _data  = req.body.data;

		// Check form data
		if (typeof _data.username === 'undefined' || typeof _data.ytlink === 'undefined' || typeof _data.email === 'undefined') {
			res.status(500).json({'message': 'Please fill out all required fields.'});
		}

		else if (checkForYtUrl(_data.ytlink) === false) {
			res.status(500).json({'message': 'Please provide a correct YouTube URL.'});
		}

		else {
			var mailData = {
				from: 'www-data@sc2hl.com',
				to: 'sc2hlreplays@gmail.com',
				subject: 'SC2HL - Hype Contest',
				text: 'Username: ' + _data.username + '\nEmail: ' + _data.email + '\nLink: ' + _data.ytlink + '',
			}

			serviceManager.mail.sendMail(mailData, function(error, response) {
				if(error) {
					res.status(500).json({'message:': 'Something went wrong sending your E-Mail. Please try again.'});
				}

				else {
					res.status(200).json({'message': 'Your video has been submitted successfully. Thanks!'});
				}
			});
		}
	}

	var router = express.Router();

    router.post('/', submitcontestvideo);

    return router;
}