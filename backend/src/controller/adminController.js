const { login,getUserList,getAdminProfile,getSubadminList,createOrEditAppUser,deleteAppUser,getUserProfile,assignAccess,logout,createRole,addOrEditTeamMember,getUserDetails,editAppUser,getMemberDetails,deleteTeamMember,getRoleList } = require('../service/adminService');

exports.login = async (req, res) => {
    try {
        const data = await login(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.logout = async (req, res) => {
    try {
        const data = await logout(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.getUserList = async (req, res) => {
    try {
        const data = await getUserList(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const data = await getUserDetails(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.editAppUser = async (req, res) => {
    try {
        const data = await editAppUser(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.getAdminProfile = async (req, res) => {
    try {
        const data = await getAdminProfile(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}


exports.getSubadminList = async (req, res) => {
    try {
        const data = await getSubadminList(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}


exports.getMemberDetails = async (req, res) => {
    try {
        const data = await getMemberDetails(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.createRole = async (req, res) => {
    try {
        const data = await createRole(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.addOrEditTeamMember = async (req, res) => {
    try {
        const data = await addOrEditTeamMember(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.assignAccess = async (req, res) => {
    try {
        const data = await assignAccess(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.createOrEditAppUser = async (req, res) => {
    try {
        const data = await createOrEditAppUser(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.deleteAppUser = async (req, res) => {
    try {
        const data = await deleteAppUser(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.deleteTeamMember = async (req, res) => {
    try {
        const data = await deleteTeamMember(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.getRoleList = async (req, res) => {
    try {
        const data = await getRoleList(req);
        res.status(200).json(data);
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}


