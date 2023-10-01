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

            let chkBlock = await adminModel.findOne({ email, isdeleted: true });

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
            const token = jwt.sign({ user_id: adminExist._id, email }, process.env.PRIVATE_KEY,{expiresIn:process.env.JWT_EXPIRY})   //, { expiresIn: process.env.apiTokenExpiresTime, });

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
       //console.log(req.params.id)
        let data = await userModel.findOne({ _id:req.query.id});

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
        console.log("created",req.body)
        let roleNameExist=await roleModel.findOne({roleName:req.body.roleName})
        if(roleNameExist){
            return {
                success: false,
                message: "Role Name is already exist,Please enter another role name.",
                data: roleNameExist
            }; 
        }
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
            if(req.body.email){
            var emailExist=await adminModel.findOne({$and:[{_id:{$ne:req.body.memberid}},{email:req.body.email}]})
            }
            
            if(emailExist){
                console.log(emailExist,"giirl")
                return {
                    success:false,
                    message:"Entered email is already used by another member,please enter different email.",
                    data:emailExist
                }   
            }
           let update=await adminModel.findOneAndUpdate({_id:req.body.memberid},req.body,{new:true})
            return {
                success:true,
                message:"Member data edited successfully",
                data:update
            }
        }
       }
      
       let emailChk=await adminModel.findOne({email:req.body.email})
       if(emailChk){
        return {
            success:false,
            message:"Entered email is already used by another member,please enter different email.",
            data:emailChk
        }   
    }
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
       //console.log(req.params.id)
        let data = await adminModel.findOne({ _id:req.query.id}).populate("roleId");

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




exports.createOrEditAppUser = async (req) => {
   
    try {
        console.log(req.body)
        if(req.body.password){
            let hash=bcrypt.hashSync(req.body.password,10);
            req.body.password=hash;
        }
        if(req.body.userid){
            let userEmailExist=await userModel.findOne({$and:[{_id:{$ne:req.body.userid}},{email:req.body.email}]})
            if(userEmailExist){
                return{
                    success:false,
                    message:"Entered email is already used by another member,please enter different email."
                }
            }
            let updateData = await userModel.findOneAndUpdate({ _id: req.body.userid },req.body, { new: true });
             console.log(updateData,"data")
            return {
                success: true,
                message: "User updated successfully!",
                data: updateData
            };
        }else{
       
            let userEmailExist=await userModel.findOne({email:req.body.email})
            if(userEmailExist){
                return{
                    success:false,
                    message:"Entered email is already used by another member,please enter different email."
                }
            }
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
         console.log(req.body.id,"come here")
            let data= await userModel.findOne({_id:req.body.id,isdeleted:false})
            if(data==null){
                return{
                    success:false,
                    message:"It seems like user is already deleted."
                }
            }
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
            let data= await adminModel.findOne({_id:req.body.id,isdeleted:false})
            if(data==null){
                return{
                    success:false,
                    message:"It seems like member is already deleted."
                }
            }
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
            let data= await roleModel.find({isdeleted:false})
            
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

exports.editRole = async(req)=>{
    try{
             console.log(req.body,"print req")
            // {$and:[{_id:{$ne:req.body.memberid}},{email:req.body.email}]}
            let existName= await roleModel.findOne({$and:[{_id:{$ne:req.body.roleId}},{roleName:req.body.roleName},{isdeleted:false}]})

            if(existName!=null){
                return{
                    success:false,
                    message:"Role name is already exist,Please enter different role name"
                }
            }

            let data= await roleModel.findOneAndUpdate({_id:req.body.roleId},req.body,{new:true})
            
            return {
                success: true,
                message: "Role data updated successfully!",
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

exports.deleteRole = async(req)=>{
    try{
            let existRole= await roleModel.findOne({_id:req.body.roleId,isdeleted:false})

            if(existRole==null){
                return{
                    success:false,
                    message:"It seems like role is already deleted"
                }
            }
            
            req.body.roleName="Not assigned"
            let data= await roleModel.findOneAndUpdate({_id:req.body.roleId},req.body,{new:true})
            
            return {
                success: true,
                message: "Role data deleted successfully!",
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

exports.getRoleDetails = async(req)=>{
    try{
            let existRole= await roleModel.findOne({_id:req.query.id,isdeleted:false})

            if(existRole==null){
                return{
                    success:false,
                    message:"It seems like role is deleted"
                }
            }
            
            return {
                success: true,
                message: "Role data fetched successfully!",
                data: existRole
            };
       
    }catch(error){
        console.log(error);
        return {
            success: false,
            message: error.message,
        };
    }
}





