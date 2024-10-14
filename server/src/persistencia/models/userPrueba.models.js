const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  authId: { type: String, required: true }, // ID del usuario en Auth0
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;