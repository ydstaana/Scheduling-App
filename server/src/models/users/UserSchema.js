var mongoose = require('mongoose');
const moment = require('moment');

const baseOptions = {
  discriminatorKey: 'userType',
  collection: 'users'
};

var UserSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  address: String,
  mobileNumber: String,
  isActive:  Boolean,
  contactPersonName: String,
  contactPersonNumber: String,
  email: String,
  username: String,
  password: String,
  status: String,
  dateCreated : { type: Date, default : new Date() },
  lastModified: { type: Date, default : new Date() }
}, baseOptions);

UserSchema.statics.authenticate = function (username, password, callback) {
  this.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }

      if(user.password == password){
      	return callback(null, user);
      } else{
      	var err = new Error('Incorrect username/password');
        err.status = 401;
        return callback(err);
      }
      
    });
}

var User = mongoose.model('User', UserSchema)
module.exports = User;