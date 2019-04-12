var mongoose = require('mongoose');
var Student = require('../../models/users/StudentSchema.js');

module.exports = function (req, res, done) {
	Student.create(req.body, function (err, student) {
		console.log(req.body);
		if (err) {
			res.status(422).json({
				message: err
			});
		}
	    else{
	    	res.status(200).send(student);
	    }
	});
}