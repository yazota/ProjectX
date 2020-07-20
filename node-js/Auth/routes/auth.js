const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidate, loginValidate }= require('../validation');
  



router.post('/register', async (req, res) => {

//validate before user creation
const {error} = registerValidate(req.body);
if(error) return res.status(400).send(error.details[0].message);

//checking if user already exists in the db
const emailExists = await User.findOne({email: req.body.email});

if(emailExists) return res.status(400).send('Email entered already exists in our database. Try to Login.');


//Hash the password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    
try{
     const savedUser = await user.save();
     res.send({user: user._id});
}catch(err){
    res.status(400).send(err);
}

});

router.post('/login', async (req, res) => {
   
    //validate user login 
    const {error} = loginValidate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     //checking if user already exists in the db
    const user = await User.findOne({email: req.body.email});
     if(!user) return res.status(400).send('Email is not found');
    
     //check password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      //password not valid
      if(!validPassword) return res.status(400).send('Password is wrong');
      
      //create and assign a token
      const token = jwt.sign({_id: user.id}, process.env.token_secert);
      res.header('auth-token', token).send(token);


      //user logged in
      //res.send('Logged in! Welcome back...');
});



module.exports = router;