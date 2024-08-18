const express =  require('express')  ;  
const bcrypt = require('bcryptjs')  ;  
const User =  require('../models/User');  
const jwt   =  require('jsonwebtoken')  ; 

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


// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;