var Group = require('../../models/groups/GroupSchema.js');
var Student = require('../../models/users/StudentSchema.js');

function createGroup(req, res) {
  Group.create(req.body, function (err, group) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(group);
      }
  });
}

function listGroups(req, res) {
  Group.find({})
    .populate('students')
    .exec( function(err, groups) {
      if(err) res.status(422).json({code:'422',message:err});
      else{
        res.status(200).send(groups);
      }
    })
}

async function addStudentToGroup(req, res) {
  const student = await Student.findById(req.body.studentId);
  const group = await Group.findById(req.body.groupId);
  
  group.students.push(student._id);
  group.save().then(group => 
    res.status(200).send(group)
  )
  .catch(err => {
    res.status(422).json({code:'422',message:err});
  })
}

module.exports = {
  createGroup : createGroup,
  listGroups : listGroups,
  addStudentToGroup : addStudentToGroup
}