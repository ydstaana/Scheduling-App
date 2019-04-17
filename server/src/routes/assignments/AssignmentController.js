var Assignment = require('../../models/assignments/AssignmentSchema.js');
var Field = require('../../models/fields/FieldSchema.js');
var Student = require('../../models/users/StudentSchema.js');

function createAssignment(req, res) {
  Assignment.create(req.body, async function (err, assignment) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
    else {
      var student = await Student.findById(assignment.student)
      student.assignments.push(assignment.id)
      student.save().then(() => res.status(200).send(assignment));
    }
  });
}

function getAssignment(req, res) {
  Assignment.findById(req.params.id)
  .populate('student')
  .populate('rotation')
  .populate('group')
  .populate('field')
  .populate('admin')
  .exec(function(err, assignment) {
    if(err) {
      res.status(422).json({
        message: err
      });
    }
    else
      res.status(200).send(assignment);
  })
}

async function updateAssignment(req, res) {
  var assign = await Assignment.findById(req.params.id)

  assign.set(req.body); 

  assign.save().then(() => {
    res.status(200).send(assign);
  })
  .catch(err => {
    res.status(422).json({
      message: err
    });
  }) 
}

function listAssignments(req, res) {
  Assignment.find({})
  .populate('student')
  .populate('rotation')
  .populate('group')
  .populate('admin')
  .exec(function (err, assignments) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(assignments);
      }
  })
}

function listAssignmentsByStudent(req ,res) {
  Assignment.find({
    student : req.params.id
  })
  .populate('student')
  .populate({
    path: 'rotation',
    populate: [
      { path: 'schedule' },
      { path: 'field' },
      { 
        path: 'fieldGroup', 
        populate: {
          path: 'fields'
        } 
      }
    ]
  })
  .populate('group')
  .populate('admin')
  .exec(function (err, assignments) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
    else{
      res.status(200).send(assignments);
    }
  })
}

function listAssignmentsByRotation(req ,res) {
  // TO DO -> Filter by isChanged
  Assignment.find({
    rotation : req.params.id
  })
  .populate('student')
  .populate('rotation')
  .populate('group')
  .populate('admin')
  .exec(function (err, assignments) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
    else{
      assignments = assignments.filter(assign => assign.fields)
      res.status(200).send(assignments);
    }
  })
}

async function listAssignmentsByFieldAdmin(req ,res) {
  var field = await Field.findOne({
    admin : req.params.id
  });

  if(field == null) {
    return res.status(422).json({
      message: "No fields for this field admin"
    });
  }

  Assignment.find({
    field : field._id
  })
  .populate('student')
  .populate('rotation')
  .populate('group')
  .populate('admin')
  .exec(function (err, assignments) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
    else{
      res.status(200).send(assignments);
    }
  })
}

module.exports = {
  createAssignment : createAssignment,
  listAssignments : listAssignments,
  getAssignment : getAssignment,
  updateAssignment : updateAssignment,
  listAssignmentsByStudent : listAssignmentsByStudent,
  listAssignmentsByRotation : listAssignmentsByRotation,
  listAssignmentsByFieldAdmin : listAssignmentsByFieldAdmin
} 