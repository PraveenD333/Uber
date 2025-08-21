import express from 'express';
import { body } from 'express-validator';
import { loginCaptain, registerCaptain,getCaptainProfile, logoutCaptain } from '../Controllers/captain.controllers.js';
import { authCaptain } from '../Middleware/auth.middleware.js';


const router = express.Router();

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').isLength({ min: 10, max: 15 }).withMessage('Invalid phone number format'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['Car', 'Motorcycle', 'Auto']).withMessage('Invalid vehicle type'),
],registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],loginCaptain);

router.get('/profile',authCaptain,getCaptainProfile);

router.get('/logout',authCaptain,logoutCaptain);


export default router;