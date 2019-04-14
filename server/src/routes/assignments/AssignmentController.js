var Assignment = require('../../models/assignments/AssignmentSchema.js');
var Student = require('../../models/users/StudentSchema.js');

function createAssignment(req, res) {
  Assignment.create(req.body, function (err, assignment) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(assignment);
      }
  });
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

module.exports = {
  createAssignment : createAssignment,
  listAssignments : listAssignments
}