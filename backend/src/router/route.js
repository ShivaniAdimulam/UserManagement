const express = require('express')
const router = express.Router()
const auth= require("../middleware/auth.js")

const {login,getUserList,getAdminProfile,getSubadminList,createOrEditAppUser,deleteAppUser,getUserProfile,assignAccess,logout,createRole,getUserDetails,editAppUser,addOrEditTeamMember,getMemberDetails,deleteTeamMember,getRoleList  } = require("../controller/adminController");



router.post('/admin/login',login);
router.post('/admin/createRole',createRole);

router.post('/admin/logout',auth,logout);
router.get('/admin/getUserList',getUserList);        
 router.get('/admin/getSubadminList',getSubadminList);
router.post('/admin/createOrEditAppUser',createOrEditAppUser);
router.get('/admin/getUserDetails/:id',getUserDetails);
//router.put('/admin/EditAppUser/:id',editAppUser)
router.put('/admin/deleteAppUser',deleteAppUser)
router.post('/admin/createRole',createRole)
router.post('/admin/createOrEditTeamMember',addOrEditTeamMember);
router.get('/admin/getMemberDetails/:id',getMemberDetails);
router.put('/admin/deleteTeamMember',deleteTeamMember);
router.get('/admin/getRoleList',getRoleList)
router.get('/admin/getAdminProfile',auth,getAdminProfile)
// router.get('/admin/getAdminProfile', auth, getAdminProfile);
// router.post('/admin/deleteAppUser',auth,deleteAppUser);
// router.post('/admin/createAppUser',auth,createAppUser);
// router.post('/admin/getUserProfile',auth,getUserProfile);
// router.post('/admin/assignAccess',auth,assignAccess);


module.exports = router