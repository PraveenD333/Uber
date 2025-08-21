import express from 'express';
import {body} from 'express-validator'
import { loginUser,registerUser,getUserProfile, logoutUser } from '../Controllers/user.controllers.js';
import { authUser } from '../Middleware/auth.middleware.js';


const router = express.Router();

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').isLength({ min: 10, max: 15 }).withMessage('Invalid phone number format')
],registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],loginUser);
 
router.get('/profile',authUser,getUserProfile);
router.get('/logout', authUser,logoutUser);


export default router;