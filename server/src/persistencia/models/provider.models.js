const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema(
    {
    providerId:{ 
        type:String,
        required: true
    },
    providerName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    nickname:{
        type:String,
    },
    picture:{
        type:String,
    },
    emailVerified:{
        type:Boolean,
        default: false
    },
},
    { timestamps: true },
    {_id:false}
)
module.exports = providerSchema; 