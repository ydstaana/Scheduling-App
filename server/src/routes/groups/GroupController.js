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

async function createDefaultGroups(req, res) {
  const groups = [
    { name: 'Unassigned', isActive: true, students: [] },
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
    .exec( function(err, groups) {
      if(err) res.status(422).json({code:'422',message:err});
      else{
        res.status(200).send(groups);
      }
    })
}

async function addStudentToGroup(req, res) {
  // iterate assignments param
  // expected payload 
  // [{stundentId: 'currentStudentId', groupId: 'newGroupId'}] // array of group ids and student ids
  const assignments = req.body.assignments;
  if (assignments) {
    assignments.forEach(async (assignment) => {
      const student = await Student.findById(assignment.studentId);
      
      // set new group to student's group
      student.set({
        ...student,
        group: assignment.groupId
      });
      student.save().then(async (stud) => {
        // remove student from old group
        const oldGroup = await Group.findById(student.group);
        const newStudents = oldGroup.students.filter(sId => {
          return !sId.equals(student._id);
        });
        oldGroup.set({
          ...oldGroup,
          students: newStudents
        });
        oldGroup.save().catch(err => {
          console.log(err);
        });

        // add student to his new group
        const newGroup = await Group.findById(assignment.groupId);
        newGroup.set({
          ...newGroup,
          students: [
            ...newGroup.students,
            student._id
          ]
        });
        newGroup.save().catch(err => {
          console.log(err);
        });
      });
    });

    res.status(200).send({});
  } else {
    res.status(422).json({code:'422', message: 'Invalid assignments'});
  }
}

module.exports = {
  createGroup : createGroup,
  listGroups : listGroups,
  addStudentToGroup : addStudentToGroup,
  getGroup : getGroup,
  createDefaultGroups: createDefaultGroups
}