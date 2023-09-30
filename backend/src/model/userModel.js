const { Schema, model, mongoose } = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = Schema({
   
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
  
    address: {
        type: String
    },
    verificationStatus:{
        type: String,
        default: "onHold"
    },

}, { timestamps: true, versionKey: false });

module.exports = model('user', userSchema);