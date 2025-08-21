import express from 'express'
import { createRide1, getfare1,confirmRide1,startRide1, endRide } from '../Controllers/ride.controllers.js';
import { authCaptain, authUser } from '../Middleware/auth.middleware.js';
import { body, query } from 'express-validator';


const router=express.Router();

router.post('/create',authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    createRide1)

router.get('/get-fare', authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage(' Invalid destination address'),
    getfare1)

router.post('/confirm',authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'), 
    confirmRide1)

router.get('/start-ride', authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride ID'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    startRide1)

router.post('/end-ride', authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    endRide)   

export default router