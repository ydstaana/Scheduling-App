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
      console.log(user);

      res.status(200).json({
        id: user._id,
        name:  user.name,
        success: true,
        message: "Login Successful",
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
  User.create(req.body, function (err, user) {
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
};

function createMedAdmin(req, res) {
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
};

function createStudent(req, res) {
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
};

function createFieldAdmin(req, res) {
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
};

function listUsers(req, res) {
  User.find({}, function(err, users) {
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
  createMedAdmin: createMedAdmin,
  createStudent: createStudent,
  createFieldAdmin: createFieldAdmin,
  listUsers: listUsers,
  listMedAdmins : listMedAdmins,
  listFieldAdmins : listFieldAdmins,
  listStudents : listStudents,
  updateUser : updateUser
}