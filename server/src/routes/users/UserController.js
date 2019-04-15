var User = require('../../models/users/UserSchema.js');
var MedAdmin = require('../../models/users/MedAdminSchema.js');
var Student = require('../../models/users/StudentSchema.js');
var FieldAdmin = require('../../models/users/FieldAdminSchema.js');
var mongoose = require('mongoose');

var UserTypes = {
  STUDENT: "Student",
  UST_MEDICINE_ADMIN: "UST Medicine Admin",
  FIELD_ADMIN: "Field Admin"
}

function login(req, res) {
  User.authenticate(req.body.email, req.body.password, function (err, user) {
    if (err) {
      res.status(403).json({
        success: false,
        message: err.message,
      });
    }
      
    else {
      res.status(200).json({
       id: user._id,
       userType : user.userType,
       firstName: user.firstName,
       middleName: user.middleName,
       lastName: user.lastName,
       address: user.address,
       mobileNumber: user.mobileNumber,
       isActive:  user.isActive,
       contactPersonName: user.contactPersonName,
       contactPersonNumber: user.contactPersonNumber,
       email: user.email,
       status: user.status,
       dateCreated : user.dateCreated,
       lastModified: user.lastModified
     });
    }
  })
} 

function getStudent(req, res) {
  Student.findById(req.params.id)
  .populate('group')
  .populate('field')
  .exec(function(err, user) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(user);
      }
  })
}

function getFieldAdmin(req, res) {
  FieldAdmin.findById(req.params.id)
  .populate('field')
  .exec(function(err, user) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(user);
      }
  })
}

function getMedAdmin(req, res) {
  MedAdmin.findById(req.params.id)
  .exec(function(err, user) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(user);
      }
  })
}

function getUser(req, res) {
  User.findById(req.params.id)
  .exec(function(err, user) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(user);
      }
  })
}

function createUser(req, res) {
  switch(req.body.userType) {
    case UserTypes.STUDENT : 
      Student.create(req.body, function (err, user) {
        console.log(req.body);
        if (err) {
          res.status(422).json({
            message: err
          });
        }
          else{
            res.status(200).send(user);
          }
      });
      break;
    case UserTypes.UST_MEDICINE_ADMIN :
      MedAdmin.create(req.body, function (err, user) {
        console.log(req.body);
        if (err) {
          res.status(422).json({
            message: err
          });
        }
          else{
            res.status(200).send(user);
          }
      });
      break;
    case UserTypes.FIELD_ADMIN :
      FieldAdmin.create(req.body, function (err, user) {
        console.log(req.body);
        if (err) {
          res.status(422).json({
            message: err
          });
        }
          else{
            res.status(200).send(user);
          }
      });
      break;
  }
};

function listUsers(req, res) {
  User.find({})
  .populate('field')
  .exec(function(err, users) {
    if(err) res.status(422).json({code:'422',message:err});
    
		else{
			res.status(200).send(users);
		}
	})
}

function listMedAdmins(req, res) {
  User.find(
    {
      userType : UserTypes.UST_MEDICINE_ADMIN
    }, function(err, users) {
		if(err) res.status(422).json({code:'422',message:err});
		else{
			res.status(200).send(users);
		}
	})
}

function listFieldAdmins(req, res) {
  User.find(
    {
      userType : UserTypes.FIELD_ADMIN
    }, function(err, users) {
		if(err) res.status(422).json({code:'422',message:err});
		else{
			res.status(200).send(users);
		}
	})
}
function listStudents(req, res) {
  User.find(
    {
      userType : UserTypes.STUDENT
    }, function(err, users) {
		if(err) res.status(422).json({code:'422',message:err});
		else{
			res.status(200).send(users);
		}
	})
}

async function updateUser(req, res) {
  const doc = await User.findById(req.params.id);
  doc.set(req.body)

  doc.save().then(() => {
		res.status(200).send(doc);
  })
  .catch(err => {
    res.status(422).json({code:'422',message:err});
  })
}

module.exports = {
  login : login,
  getUser : getUser,
  getStudent : getStudent,
  getFieldAdmin : getFieldAdmin,
  getMedAdmin : getMedAdmin,
  createUser: createUser,
  listUsers: listUsers,
  listMedAdmins : listMedAdmins,
  listFieldAdmins : listFieldAdmins,
  listStudents : listStudents,
  updateUser : updateUser
}