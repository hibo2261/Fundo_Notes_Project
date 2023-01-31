import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};




export const userRegistration = async (req, res, next) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message:data,
      message: 'User Registeration Done Successfully....'
    });
  } catch (error) {
    next(error);
  }
};


export const login =async(req,res,next) => {
  try
  {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data:data,
      message:'User login Done Successfully....'
    });
  } catch (error) {
    next(error);
  }
};