import User from '../models/user.model';
const bcrypt = require('bcrypt')
import jwt from 'jsonwebtoken';



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
 
    let token = jwt.sign({email : userdata.email},process.env.JWT_SECRET_KEY)

    return token;
  }
  catch (error) {
    throw new Error(error)
  }

};
