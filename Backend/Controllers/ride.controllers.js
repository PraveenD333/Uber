import { validationResult } from 'express-validator'
import { confirmRide, createRide, endRide1, getfare, startRide } from '../Services/ride.service.js';
import { getCaptainsInTheRadius, getMap } from '../Services/maps.service.js';
import { sendmessageToSocketId } from '../socket.js';
import rideModel from '../models/ride.model.js';

export const createRide1 = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        

        const pickupcoordinates = await getMap(pickup);
        const CaptainsInRadius = await getCaptainsInTheRadius(pickupcoordinates.ltd, pickupcoordinates.lng, 20); // 2 km radius 
        // console.log(CaptainsInRadius);

        ride.otp = ""

        const rideWithUserDoc = await rideModel.findOne({ _id: ride._id }).populate('user');
        const rideWithUser=rideWithUserDoc.toObject();
        rideWithUser.distanceKm = ride.distanceKm;

        CaptainsInRadius.map(captain => {
            // console.log(captain, ride);
            sendmessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const getfare1 = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getfare(pickup, destination);
        return res.status(200).json(fare);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const confirmRide1 = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await confirmRide({ rideId, captain: req.captain._id});

        sendmessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const startRide1 = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRide({ rideId, otp, captain: req.captain })


        sendmessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await endRide1({ rideId, captain: req.captain });

        sendmessageToSocketId(ride.user.socketId, {
            event: 'ride-completed',
            data: ride
        });
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}