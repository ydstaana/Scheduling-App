const mongoose = require('mongoose');
var MedAdmin = require('../../../models/users/MedAdminSchema.js');

module.exports = function(req, res){
	MedAdmin.findById(req.params.id, function(err, users) {
		if(err) res.status(422).json({code:'422',message:err});
		else{
			res.status(200).send(users);
		}
	})
}