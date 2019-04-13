const express = require('express');
const router = express.Router();

const userController = require('./users/UserController')
const groupController = require('./groups/GroupController')
const fieldController = require('./fields/FieldController')
const scheduleController = require('./schedules/ScheduleController')

//router.get('/authorize', messenger_platform.authorize);


//Users
router.get('/users', userController.listUsers);
router.get('/users/med-admins', userController.listMedAdmins);
router.get('/users/field-admins', userController.listFieldAdmins);
router.get('/users/:id', userController.getUser);

router.put('/users/:id', userController.updateUser);

router.get('/users/students', userController.listStudents);
router.get('/users/med-admins', userController.listMedAdmins);
router.post('/users', userController.createUser);
router.post('/users/med-admins', userController.createMedAdmin);
router.post('/users/field-admins', userController.createFieldAdmin);
router.post('/users/students', userController.createStudent);

//Groups
router.get('/groups', groupController.listGroups);
router.post('/groups', groupController.createGroup);

//Fields
router.get('/fields', fieldController.listFields);
router.post('/fields', fieldController.createField);

//FieldGroups
router.get('/fields', fieldController.listFieldGroups);
router.post('/fields', fieldController.createFieldGroup);

//Schedules
router.get('/schedules', scheduleController.listSchedules);
router.post('/schedules', scheduleController.createSchedule);

module.exports = router;