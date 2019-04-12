const express = require('express');
const router = express.Router();

const get_all_users = require('./users/get_all_users')
const create_student = require('./users/create_student')
const create_med_admin = require('./users/med-admin/create_med_admin')
const get_all_med_admin = require('./users/med-admin/get_all_med_admin')
const get_single_med_admin = require('./users/med-admin/get_single_med_admin')
const update_med_admin = require('./users/med-admin/update_med_admin')

//router.get('/authorize', messenger_platform.authorize);

//Users
router.get('/users', get_all_users);

//MedAdmin
router.get('/users/med-admin/:id', get_single_med_admin);
router.get('/users/med-admin', get_all_med_admin);
router.post('/users/med-admin', create_med_admin);
router.put('/users/med-admin/:id', update_med_admin);

//Student
router.post('/users', create_student);

module.exports = router;