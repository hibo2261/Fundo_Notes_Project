import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuther } from '../middlewares/auth.middleware';

const router = express.Router();



//route to create a new user
//router.post('', newUserValidator, userController.newUser);
//route to get a single user by their user id
//router.get('/:_id', userAuth, userController.getUser);
//route to update a single user by their user id
//router.put('/:_id', userController.updateUser);
//route to delete a single user by their user id
//router.delete('/:_id', userController.deleteUser);

//route to get all users
router.get('/getall', userController.getAllUsers);

//route to register a new user
router.post('/UserRegistration', newUserValidator, userController.userRegistration);

//route to login
router.post('/Userlogin',userController.login);

//route to forgetPassword
router.post('/forgetPassword',userController.forgetPassword);

//route to resetPassword
router.post('/resetpassword/:token',  userAuther , userController.resetPassword);


export default router;
