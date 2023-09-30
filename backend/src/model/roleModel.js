const { Schema, model, mongoose } = require('mongoose');

const roleSchema = Schema({
    roleName:{
        type:String
    },
    addUser:{
        type:Boolean
        
    },
    editUser:{
        type:Boolean
        
    },
    deleteUser:{
        type:Boolean
        
    },
}, { timestamps: true, versionKey: false });

module.exports = model('role', roleSchema);