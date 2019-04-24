var Group = require('../../models/groups/GroupSchema.js');
var Student = require('../../models/users/StudentSchema.js');
var Field = require('../../models/fields/FieldSchema.js');
var FieldGroup = require('../../models/fields/FieldGroupSchema.js');
var Rotation = require('../../models/rotations/RotationSchema.js');
var Assignment = require('../../models/assignments/AssignmentSchema.js');

var RotationType = {
  SINGLE: "Single",
  MULTIPLE: "Multiple",
  SPECIAL : "Special"
}

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

function createNewAssignment(groupId, studentId, rotationId, fieldId) {
  return new Promise(function(resolve, reject) {
    console.log("Creating a new doc...");
    new Assignment({
      student : studentId,
      rotation : rotationId,
      group : groupId,
      field : fieldId
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

async function createAssignments(group, student) {
  return new Promise(function(resolve, reject) {
    //Create assignments of the student from the group
    var counter = 0;
    group.rotations.forEach(async rot => {
      var rotation = await Rotation.findById(rot);
      rotation.studentCount += 1;

      switch(rotation.rotationType) {
        case RotationType.SINGLE:
          await createNewAssignment(student.group, student.id, rotation.id, rotation.field)
          .then(() => {
            console.log("Created an assignment");
            counter++;
            if(counter == group.rotations.length) {
              rotation.save().then(newRotation => {
                console.log("Should have ended here");
                console.log(`Rotation now has ${newRotation.studentCount} students`);
                resolve();
              })
              
            }
          })
          .catch(error => {
            console.error(error);
            reject(err);
          });
          break;
        default : //For RotationType Elective and Multiple
          var fieldGroup = await FieldGroup.findById(rotation.fieldGroup)
          var fieldCtr = 0;

          fieldGroup.fields.forEach(async field => {
            await createNewAssignment(student.group, student.id, rotation.id, field)
            .then(assign => {
              fieldCtr++;

              //Add created assignment to student
              student.assignments.push(assign);
              if(fieldCtr == fieldGroup.fields.length) {
                console.log("Should have ended here for FieldGroup")
                resolve();
              }
            })
            .catch(err => {
              reject(err);
            })
          })
          break;
      }
    })
  }) 
}

async function removeStudentFromGroup(studentId, groupId) {
  return new Promise(async function(resolve, reject) {
    var group = await Group.findById(groupId);

    group.students = group.students.splice(group.students.indexOf(studentId), 1)
    group.save().then(() => {
      console.log("Removed student from group");
      resolve();
    })
    .catch(err => {
      reject(err);
    })
  })
}

function addStudentToGroup(req, res) {
  /*
    [
      {
        "studentId": "5cb6c75591a3bd08bec4d5e8",
        "groupId": "5cb6c74991a3bd08bec4d5db"
      }
    ]
  */
  var requests = req.body;
  try {
    requests.forEach(async request => {
      var student = await Student.findById(request.studentId);
      var group = await Group.findById(request.groupId);
  
      if(group == null) {
        throw new Exception("Group does not exist");
      }
  
      if(student == null) {
        throw new Exception("Student does not exist");
      }
  
      //Remove the student from group
      if(student.group != null) {
        await removeStudentFromGroup(student.id, student.group)
        console.log("PUMASOK BA DITO?")
      }
  
      //Change student's group
      student.group = request.groupId;
  
      //Add student to Group
      if(group.students.indexOf(student.id) == -1)  {
        group.students.push(student.id);
        createAssignments(group, student).then(() => {
          student.save().then(() => {
            group.save().then(() => {
              res.status(200).send({
                message : "Add student to group successful"
              });
            })
          })
        })
      }
      else {
        throw new Error("Student already in group");
      }
    })
  }
  catch(err) {
    return res.status(422).json({
      message : err.message
    });
  }
}

module.exports = {
  createGroup : createGroup,
  listGroups : listGroups,
  addStudentToGroup : addStudentToGroup,
  getGroup : getGroup,
  createDefaultGroups: createDefaultGroups  
}