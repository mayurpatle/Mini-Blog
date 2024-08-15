const express =  require('express')  ;  
const bcrypt = require('bcryptjs')  ;  
const User =  require('../models/User');  

const router = express.Router();

// @route  POST /api/auth/register
// @desc Register  a  user    
// access Public 

router.post('/register'  , async (req  , res  )  => {
    const { username , email , password } = req.body  ; 

    try {
        // check if the  User already exist 
        let user =  await User.findOne({email})  ; 
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        // create   a new  user interface 
        user =  new User({
            username ,
            email ,
            password,

        }); 


        // hash the  password 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save  the  user to the  data base 
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });


    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error');

    }

});;  

module.exports = router;