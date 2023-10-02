const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth.js")

const { login, getUserList, getAdminProfile, getSubadminList, createOrEditAppUser, deleteAppUser, logout, createRole, getUserDetails, addOrEditTeamMember, getMemberDetails, deleteTeamMember, getRoleList,editRole,deleteRole,getRoleDetails } = require("../controller/adminController");


//************************Loggedin admin related apis**************************************** 
router.post('/admin/login', login);
router.get('/admin/getAdminProfile', auth, getAdminProfile);
router.post('/admin/logout', auth, logout);

//************************App user related apis**********************************************
router.get('/admin/getUserList', auth, getUserList);
router.post('/admin/createOrEditAppUser', auth, createOrEditAppUser);
router.get('/admin/getUserDetails', auth, getUserDetails);
router.put('/admin/deleteAppUser', auth, deleteAppUser)

//**************************Role apis********************************************************* 
router.post('/admin/createRole', auth, createRole);
router.get('/admin/getRoleList', auth, getRoleList);
router.put('/admin/editRole', auth, editRole);
router.put('/admin/deleteRole',auth,deleteRole);
router.get('/admin/getRoleDetails',auth,getRoleDetails);

//****************************Team member related apis*****************************************
router.get('/admin/getSubadminList', auth, getSubadminList);
router.post('/admin/createOrEditTeamMember',auth,addOrEditTeamMember);
router.get('/admin/getMemberDetails', auth, getMemberDetails);
router.put('/admin/deleteTeamMember', auth, deleteTeamMember);


module.exports = router