import User from '../models/user.model';
const bcrypt = require('bcrypt')
import jwt from 'jsonwebtoken';
import {sendMail} from '../utils/user.util';



//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};


//create new user
export const userRegistration = async (body) => {
  const existingUser = await User.findOne({ email: body.email });
  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    const data = await User.create(body);
    return data;
  }
  else {
    throw new Error("User already exist")
  }
};

//User Login Validation
export const login = async (body) => {
  try {
    const userdata = await User.findOne({ email: body.email });
    if (!userdata) {
      throw new Error("Please Enter Valid Email....")
    }
    const validPassword = await bcrypt.compare(body.password,userdata.password);
    if(!validPassword){
      throw new Error("Please Enter Valid Password....")
    }
 
    let token = jwt.sign({email : userdata.email, id: User._id  },process.env.JWT_SECRET_KEY)

    return token;
  }
  catch (error) {
    throw new Error(error)
  }

};


//--------> Forget password
export const  forgetPassword = async (body) => {

  
  try{
    const data = await User.findOne({ email: body.email });
    console.log("---------------",data)
      const token = await jwt.sign({ email : data.email , _id : User._id }, process.env.PASSWORDKEY);
 console.log("-------------------------------------------",token);
     const mailsend = await sendMail(data.email, token);
    return mailsend;
  } catch{
    throw new Error("Email not found");
  }
}

export const resetPassword = async (token, body) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password,saltRounds);
  body.password = passwordHash; 
  const data = User.findOneAndUpdate(
    {
      email: body.email
    },
    {
      password: body.password
    },
    {
      new: true
    })
  return data;
};