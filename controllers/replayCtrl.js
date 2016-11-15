var express          = require('express');
var fs               = require('fs');

module.exports = function(serviceManager) {

	var submitreplay = function(req, res) {
		var _data  = JSON.parse(req.body.data);
		var failed = false;

		// Check mimetype and file extension
		if(req.files.file.mimetype != 'application/octet-stream' || req.files.file.extension != 'SC2Replay') {
			failed = true;
			res.status(500).send('The selected file is not a Starcraft 2 replay.');
		}

		// Check filesize
		else if(req.files.file.size > 500000) {
			failed = true;
			res.status(500).send('The selected file is too big.');
		}

		// Check form data
		else if (typeof _data.name === 'undefined' || typeof _data.message === 'undefined' || typeof _data.timestamp === 'undefined') {
			failed = true;
			res.status(500).send('Please fill out all required fields.');
		}

		var uploadDir = '/tmp/uploads/';
		var path = uploadDir + _data.name + '-' + new Date().getTime() / 1000 + '.SC2Replay';

		if(!failed) {
			// Create the upload directory if it doesn't exist
			fs.mkdir(uploadDir,function(err) {
				if(err) {
					// If the directory exists, ignore the error
					if (err.code !== 'EEXIST') {
						res.status(500).send('Something went wrong uploading your replay. Please try again.');
					}
				}
				fs.readFile(req.files.file.path, function(err, data) {
					fs.writeFile(path, data, function (err) {
						if(err) {
							res.status(500).send('Something went wrong uploading your replay. Please try again.');
						}

						else {
							var category = '';

							if(_data.category == 'Plays') {
								category = 'Plays';
							}

							else if(_data.category == 'Failed') {
								category = 'Fails';
							}

							var mailData = {
			            			from: 'www-data@sc2hl.com',
						            to: 'sc2hlreplays@gmail.com',
						            subject: 'SC2HL - Replay [' + _data.game + '][' + category + ']',
						            text: 'Username: ' + _data.name + '\nEmail: ' + _data.email + '\nTimestamp: ' + _data.timestamp + '\nMessage: ' + _data.message,
						            attachments: [{path: path}]}

			        				serviceManager.mail.sendMail(mailData, function(error, response) {
				        				if(error) {
				        					console.log('Error sending an E-Mail: ' + error);
				        					res.status(500).send('Something went wrong sending your E-Mail. Please try again.');
				        				}

				        				else {
				        					res.send('Your replay has been submitted successfully. Thanks!');
				        				}
			        				});
						}
					});
				});
			});
		}
	}

	var router = express.Router();

    router.post('/', submitreplay);

    return router;
}