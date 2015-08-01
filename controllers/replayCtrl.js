var express = require('express');
var fs      = require('fs');

module.exports = function(serviceManager) {

	var submitreplay = function(req, res) {
		var fail   = false;
		var errors = {};
		var data   = {};
		var _data  = JSON.parse(req.body.data);

		// Check mimetype and file extension
		if(req.files.file.mimetype != 'application/octet-stream' || req.files.file.extension != 'SC2Replay') {
			errors.filetype = 'The selected file "' + req.files.file.originalname + '" is not a Starcraft 2 replay';
			fail = true;
		}

		// Check filesize
		if(req.files.file.size > 500000) {
			errors.filesize = 'The selected file "' + req.files.file.originalname + '" is too big';
			fail = true;
		}

		// Check form data
		if(_data.email === '' || _data.name === '' || _data.message === '') {
			errors.formdata = 'Please fill out all required fields.';
			fail = true;
		}

		if(!fail) {
			var path = __dirname + '/../uploads/' + _data.email + '-' + req.files.file.originalname;

			fs.readFile(req.files.file.path, function(err, data) {
				fs.writeFile(path, data, function (err) {
					console.log('file saved to' + path);
				});
			});

			serviceManager.mail.sendMail({
            	from: 'www-data@sc2hl.com',
            	to: 'sc2hlreplays@gmail.com',
            	subject: 'SC2HL - Replay',
            	text: 'Username: ' + _data.name + '\nEmail: ' + _data.email + '\nMessage: ' + _data.message,
            	attachments: [{path: path}]
        	}, function(error, response) {
        		if(error) {
        			console.log(error);
        		} else {

        		}
        	});

			data.success = true;
			data.message = 'Your replay has been submitted succesfuly. Thanks!';
		}

		else {
			data.errors = errors;
			data.success = false;
		}

		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(data));
	}

	var router = express.Router();

    router.post('/', submitreplay);

    return router;
}