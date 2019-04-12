var mongoose = require('mongoose');
var MedAdmin = require('../../../models/users/MedAdminSchema.js');

module.exports = function (req, res, done) {
	MedAdmin.create(req.body, function (err, admin) {
		console.log(req.body);
		if (err) {
			res.status(422).json({
				message: err
			});
		}
	    else{
	    	res.status(200).send(admin);
	    }
	});
}