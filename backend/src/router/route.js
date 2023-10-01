const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth.js")

const { login, getUserList, getAdminProfile, getSubadminList, createOrEditAppUser, deleteAppUser, logout, createRole, getUserDetails, addOrEditTeamMember, getMemberDetails, deleteTeamMember, getRoleList,editRole,deleteRole,getRoleDetails } = require("../controller/adminController");



router.post('/admin/login', login);
router.post('/admin/logout', auth, logout);
router.get('/admin/getUserList', auth, getUserList);
router.get('/admin/getSubadminList', auth, getSubadminList);
router.post('/admin/createOrEditAppUser', auth, createOrEditAppUser);
router.get('/admin/getUserDetails/:id', auth, getUserDetails);
router.put('/admin/deleteAppUser', auth, deleteAppUser)
router.post('/admin/createRole', auth, createRole)
router.post('/admin/createOrEditTeamMember',addOrEditTeamMember);
router.get('/admin/getMemberDetails/:id', auth, getMemberDetails);
router.put('/admin/deleteTeamMember', auth, deleteTeamMember);
router.get('/admin/getRoleList', auth, getRoleList)
router.get('/admin/getAdminProfile', auth, getAdminProfile)
router.put('/admin/editRole', auth, editRole);
router.put('/admin/deleteRole',auth,deleteRole);
router.get('/admin/getRoleDetails/:id',auth,getRoleDetails);


module.exports = router