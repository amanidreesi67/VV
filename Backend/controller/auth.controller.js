import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jwt for token generation
import * as userservices from '../services/user.services.js';
import generateToken from '../config/jwtprovider.js';

//controller for user registration
export const register = async(req,res) =>{
     try{
        console.log("controller data", req.body);
        const user = await userservices.registerUser(req); // call register service
        const jwt =  generateToken(user._id); // generate token after register
       res.status(200).json({jwt, message:"Register Successfull"}); // response with jwt token
     } catch(err){
       
        res.status(400).json({error:err.message}); 
     }
};

//conttroller for user login

export const login = async(req,res)=>{
   try{
      const {email,password} = req.body;  // get email and password from request body
      const user = await userservices.getUserByEmail(req);  // call service to get user by email
      if(!user){
         return res.status(401).json({message:"User Is Not Registered With This Email "});
      }
      const isPassword = await bcrypt.compare(password, user.password); // compare password

      if(!isPassword){ // if password not match
         return res.status(400).json({message:"Invalid Password "});  // response invalid password
      }

      const jwt = await generateToken(user._id); // generate token after login
      return res.status(200).json({jwt, message:"Login Successfull"}); // response with jwt token

   }catch(err){
      res.status(400).json(err.message);
   }
};