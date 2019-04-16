var Group = require('../../models/groups/GroupSchema.js');
var Student = require('../../models/users/StudentSchema.js');
var Assignment = require('../../models/assignments/AssignmentSchema.js');

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

async function createDefaultGroups(req, res) {
  const groups = [
    { name: 'Group 1', isActive: true, students: [] },
    { name: 'Group 2', isActive: true, students: [] },
    { name: 'Group 3', isActive: true, students: [] },
    { name: 'Group 4', isActive: true, students: [] },
    { name: 'Group 5', isActive: true, students: [] },
    { name: 'Group 6', isActive: true, students: [] },
    { name: 'Group 7', isActive: true, students: [] },
    { name: 'Group 8', isActive: true, students: [] },
    { name: 'Group 9', isActive: true, students: [] },
    { name: 'Group 10', isActive: true, students: [] },
    { name: 'Group 11', isActive: true, students: [] },
    { name: 'Group 12', isActive: true, students: [] }
  ];

  groups.forEach(async (g) => {
    await Group.create(g);
  });

  res.status(200).send({});
}

function getGroup(req, res) {
  Group.findById(req.params.id)
  .populate('students')
  .populate('rotation')
  .exec(function(err, group) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
    else{
      res.status(200).send(group);
    }
  })
}

function listGroups(req, res) {
  Group.find({})
    .populate('students')
    .populate('rotations')
    .exec( function(err, groups) {
      if(err) res.status(422).json({code:'422',message:err});
      else{
        res.status(200).send(groups);
      }
    })
}

function createNewAssignment(group, student, rotation) {
  return new Promise(function(resolve, reject) {
    console.log("Creating a new doc...");
    new Assignment({
      student : student.id,
      rotation : rotation,
      group : group.id
    })
    .save().then(async assign => {
      console.log("Creating a new doc finished executing...");
      resolve(assign._id)
    })
    .catch(err => {
      reject(err);
    })
  })
}
async function addStudentToGroup(req, res) {
  const requests = req.body;
  requests.forEach(async request => {
    var student = await Student.findById(request.studentId);
    student.group = request.groupId;
    
    if(student.assignments.length != 0)
      student.assignments.forEach(async assign => {
        var tempAssign = await Assignment.findById(assign.id)
        tempAssign.isActive = false;
        tempAssign.save();
      })

    const newGroup = await Group.findById(student.group);
    newGroup.students.push(student.id);

    var counter = 0;
    newGroup.rotations.forEach(rotation => {
      createNewAssignment(newGroup, student, rotation)
      .then(result => {
        counter++;
        student.assignments.push(result);
        if(counter == newGroup.rotations.length) {
          newGroup.save();
          student.save().then(async () => {
            res.status(200).send(student);
          })
          .catch(err => {
            return res.status(422).json({code:'422', message: err});
          }) 
        }
      })
    })    
  })
}

module.exports = {
  createGroup : createGroup,
  listGroups : listGroups,
  addStudentToGroup : addStudentToGroup,
  getGroup : getGroup,
  createDefaultGroups: createDefaultGroups  
}