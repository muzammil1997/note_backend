const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

const User = mongoose.model('User');

const validateSignup = (data) => {
    let errors = {};

    
   
    if(validator.isEmpty(data.username)){
        errors.username = 'This field is required';
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'This field is required';
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};


module.exports.signup = async (req, res) => {
  
    const { errors, isValid } = validateSignup(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const {
    username, email,password
    } 
        = req.body;
    try{
        const user = new User({username,email,password});
        await user.save();
        const token = jwt.sign({userId: user._id, username: user.username}, 'MY_SECRET_KEY');
        return res.send({token});
    }
    catch(err){
        return res.status(422).send({email: 'This email account is already exists.'}); 
    }
};

const validateSignin = (data) => {
    
    let errors = {};
 
    if(validator.isEmpty(data.username)){
        errors.username = 'This field is required';
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports.signin = async (req, res) => {
    const { errors, isValid } = validateSignin(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const { username, password } = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(422).send({error: 'Invalid username or password.'});
    }
    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id, username: user.username}, 'MY_SECRET_KEY');
        return res.send({token});
    }
    catch(err){
        return res.status(422).send({error: 'Invalid username or password.'});
    }
};