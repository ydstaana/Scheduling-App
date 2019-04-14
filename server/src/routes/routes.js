const express = require('express');
const router = express.Router();

const userController = require('./users/UserController')
const groupController = require('./groups/GroupController')
const fieldController = require('./fields/FieldController')
const scheduleController = require('./schedules/ScheduleController')
const rotationController = require('./rotations/RotationController')
const assignmentController = require('./assignments/AssignmentController')

router.get('/login', userController.login);

//Users
router.get('/users', userController.listUsers);
router.get('/users/med-admins', userController.listMedAdmins);
router.get('/users/field-admins', userController.listFieldAdmins);
router.get('/users/students', userController.listStudents);
router.get('/users/med-admins', userController.listMedAdmins);
router.get('/users/:id', userController.getUser);

router.put('/users/:id', userController.updateUser);

router.post('/users', userController.createUser);
router.post('/users/med-admins', userController.createMedAdmin);
router.post('/users/field-admins', userController.createFieldAdmin);
router.post('/users/students', userController.createStudent);

//Groups
router.get('/groups', groupController.listGroups);
router.post('/groups', groupController.createGroup);
router.post('/groups/addStudent', groupController.addStudentToGroup);

//Fields
router.get('/fields', fieldController.listFields);
router.post('/fields', fieldController.createField);

//FieldGroups
router.get('/fields', fieldController.listFieldGroups);
router.post('/fields', fieldController.createFieldGroup);

//Schedules
router.get('/schedules', scheduleController.listSchedules);
router.post('/schedules', scheduleController.createSchedule);

//Rotations
router.post('/rotations', rotationController.createRotation);
router.get('/rotations', rotationController.listRotations);

//Assignments
router.get('/assignments', assignmentController.listAssignments);
router.post('/assignments', assignmentController.createAssignment);

module.exports = router;