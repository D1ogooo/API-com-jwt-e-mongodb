const mongoose = require('../../config/database')

const UserSchema = new mongoose.Schema({
  username: {
   type: String,
   require: true,
  },
  email: {
   type: String,
   require: true,
  },
  password: {
   type: String,
   required: true,
  },
  confirmPassword: {
   type: String,
   required: false,
  },
  createdAt: {
   type: Date,
   default: new Date(),
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User