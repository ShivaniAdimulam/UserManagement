const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userModel =  require('../model/userModel');
const adminModel = require('../model/adminModel');
const roleModel = require('../model/roleModel');


exports.login = async (req, res) => {
    
    try {
       
        const { email, password } = req.body;
       
        
         let   adminExist = await adminModel.findOne({ email, isdeleted: false });

            let chkBlock = await userModel.findOne({ email, isdeleted: false });

            if (chkBlock) {
                return {
                    success: false,
                    message: `Your account has been suspended.Please contact superAdmin for further queries/assistance.`,
                    data: {}
                };
            }
       

        if (!adminExist) {
            return {
                success: false,
                message: "User not found!",
                data: {}
            };
        }
        if (adminExist&& (bcrypt.compareSync(password, adminExist.password))) {
            // Create token
            const token = jwt.sign({ user_id: adminExist._id, email }, "privateKey" )   //, { expiresIn: process.env.apiTokenExpiresTime, });

            adminExist.token = token;
            adminExist.loginStatus = true
            
            await adminExist.save();
            
           
            return {
                success: true,
                message: "User LoggedIn Successfully",
                data: adminExist
            };
        } else {
            return {
                success: false,
                message: "Password mismatch. Please enter correct password!",
                data: {}
            };
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    };
};

exports.logout = async (req) => {
   
    try {
       
        let updateLoginStatus = await adminModel.findOneAndUpdate({ _id: req.user._id }, { loginStatus: false, token: "" }, { new: true });

        return {
            success: true,
            message: "Logged out successfully!",
            data: updateLoginStatus
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.getUserList = async (req) => {
   
    try {
       
        let data = await userModel.find({ isdeleted:false});

        return {
            success: true,
            message: "User list is here!",
            data: data
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}


exports.getAdminProfile= async (req) => {
   
    try {
        console.log(req.user._id,"yes")
       
        let data = await adminModel.findOne({ _id:req.user._id});

        return {
            success: true,
            message: "Admin profile is here!",
            data: data
        };
    } catch (error) {
       
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}


exports.getUserDetails= async (req) => {
   
    try {
       console.log(req.params.id)
        let data = await userModel.findOne({ _id:req.params.id});

        return {
            success: true,
            message: "User profile is here!",
            data: data
        };
    } catch (error) {
       
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.editAppUser= async (req) => {
   
    try {
       
        let data = await userModel.findOneAndUpdate({ _id:req.params.id},req.body,{new:true});

        return {
            success: true,
            message: "User profile is updated!",
            data: data
        };
    } catch (error) {
       
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}


exports.getSubadminList= async (req) => {
   
    try {
       
        let data = await adminModel.find({ isdeleted:false}).populate("roleId");

        return {
            success: true,
            message: "Admin list is here!",
            data: data
        };
    } catch (error) {
       
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}


exports.createRole= async (req) => {
   
    try {

       let data = await roleModel.create(req.body)
       
        return {
            success: true,
            message: "Role created successfully!",
            data: data
        };
    } catch (error) {
       
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}


exports.addOrEditTeamMember= async (req) => {
   
    try {
   console.log(req.body,"jai shree ram")
        if(req.body.password){
            let hash=bcrypt.hashSync(req.body.password,10);
            req.body.password=hash;
        }
       
       if(req.body.memberid){
        let findMember=await adminModel.findOne({_id:req.body.memberid})
        console.log("yes found",findMember)
        if(findMember!=null){
            let update=await adminModel.findOneAndUpdate({_id:req.body.memberid},req.body,{new:true})
            return {
                success:true,
                message:"Member data edited successfully",
                data:update
            }
        }
       }
      
        console.log("hi")
       let data = await adminModel.create(req.body)
        
        return {
            success: true,
            message: "New member added successfully in the team!",
            data: data
        };
    } catch (error) {
       
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.getMemberDetails= async (req) => {
   
    try {
       console.log(req.params.id)
        let data = await adminModel.findOne({ _id:req.params.id}).populate("roleId");

        return {
            success: true,
            message: "User profile is here!",
            data: data
        };
    } catch (error) {
       
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.assignAccess= async (req) => {
   
    try {
       
        
        return {
            success: true,
            message: "Admin list is here!",
            data: data
        };
    } catch (error) {
       
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.editAppUser = async (req) => {
   
    try {
       
        let updateData = await userModel.findOneAndUpdate({ _id: req.params.userid },req.body, { new: true });

        return {
            success: true,
            message: "User updated successfully!",
            data: updateData
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}


exports.createOrEditAppUser = async (req) => {
   
    try {
        console.log(req.body)
        if(req.body.password){
            let hash=bcrypt.hashSync(req.body.password,10);
            req.body.password=hash;
        }
        if(req.body.userid){
            let updateData = await userModel.findOneAndUpdate({ _id: req.body.userid },req.body, { new: true });
             console.log(updateData,"data")
            return {
                success: true,
                message: "User updated successfully!",
                data: updateData
            };
        }else{
       
        
        let data = await userModel.create(req.body);

        return {
            success: true,
            message: "User added successfully!",
            data: data
        };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.deleteAppUser = async(req)=>{
    try{
            let data= await userModel.findOne({_id:req.body.id})
            let deleteData = await userModel.findOneAndUpdate({_id:req.body.id},{isdeleted:true},{new:true});
            console.log(deleteData,req.body,data)
            return {
                success: true,
                message: "User deleted successfully!",
                data: deleteData
            };
       
    }catch(error){
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}


exports.deleteTeamMember = async(req)=>{
    try{
            let data= await adminModel.findOne({_id:req.body.id})
            let deleteData = await adminModel.findOneAndUpdate({_id:req.body.id},{isdeleted:true},{new:true});
            console.log(deleteData,req.body,data)
            return {
                success: true,
                message: "User deleted successfully!",
                data: deleteData
            };
       
    }catch(error){
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}

exports.getRoleList = async(req)=>{
    try{
            let data= await roleModel.find()
            
            return {
                success: true,
                message: "List fetched successfully!",
                data: data
            };
       
    }catch(error){
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}




