// const mongoose = require('mongoose');
// const providerSchema = require('./provider.models');

// const userSchema = new mongoose.Schema({
//     sid: {
//         type: mongoose.Schema.Types.ObjectId,
//         default:() => new mongoose.Types.ObjectId()
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     socketId: {
//         type: String,
//         required: false
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: false
//     },
//     id_emp: {
//         type: String,
//         required: false
//     },
//     rol: {
//         type: String,
//         required: true
//     },
//     status: { 
//         type: String,
//         required: true, 
//         enum: ['active', 'disconnected'] },
//     picture :{
//         type:String,
//     },
//     providers:[providerSchema]

// },
//     { timestamps: true }
// )
// const User = mongoose.model('User', userSchema);
// module.exports = User;