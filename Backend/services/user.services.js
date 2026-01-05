import User from "../model/user.model.js";
import bcrypt from 'bcrypt';


export const registerUser = async(req,res)=>{
    try{
      
        const {firstName, lastName, email, password, role} = req.body; // get user details from request body
        const emailExist = await User.findOne({email});
        console.log("exist")
        if(emailExist){
            throw new Error("User already exist withh this email..", email);
        }
        const hashPassword = await bcrypt.hash(password,8);

        const user =  await User.create({firstName,lastName, email, password:hashPassword});
         
        console.log("user", user);
        return user;
    } catch(err){
         console.log("error", err.message)
        throw new Error("error..", err.message);
    }
};

export const getUserByEmail = async()=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User Does Not Exists With This Email", email);
        }
        return user;
    }catch(err){
        throw new Error(err.message);
    }
};