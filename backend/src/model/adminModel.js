const { Schema, model, mongoose } = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const adminSchema = Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    
    otp: {
        type: Number,
        default: 0
    },
    isdeleted: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    },
    loginStatus: {
        type: Boolean
    },
    roleId: {
        type: ObjectId,
        ref: "role"
        // default: "notAssigned"
    },
    
    status:{
        type: String,
        default: "onHold"
    },
    role:{
        type: String
    }
   

}, { timestamps: true, versionKey: false });

module.exports = model('admin', adminSchema);