const mongoose =   require('mongoose')  ;   

// define  the  user schema  
const  userSchema =  new  mongoose.Schema({
    username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// create  te  user model  
const User =  mongoose.model('User'  , userSchema)  ;  


module.exports = User  ;  
