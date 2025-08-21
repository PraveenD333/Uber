import rideModel from "../models/ride.model.js";
import { getdistancetime } from "./maps.service.js";
import crypto from 'crypto'
import { sendmessageToSocketId } from "../socket.js";   

export const getfare=async function getFare(pickup,destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required');
    }

    const distanceTime= await getdistancetime(pickup,destination)

     const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;

}

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

export const createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    // Get fare and distance
    const distanceTime = await getdistancetime(pickup, destination);
    const fare = await getfare(pickup, destination);
    const distanceKm = Math.round(distanceTime.distance.value / 1000);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
        distanceKm
    });

    // Return ride and distance
    return { ...ride.toObject(), distanceKm };
}

export const confirmRide=async({rideId,captain})=>{
    if (!rideId || !captain) {
        throw new Error('Ride ID and Captain are required');
    }

    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'accepted',captain:captain._id })

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }
    return ride;
}

export const startRide= async ({ rideId, otp,captain }) => {

    if (!rideId || !otp || !captain) {
        throw new Error('Ride ID, OTP, and Captain are required');
    }

    const ride = await rideModel.findOne({ _id: rideId}).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Invalid Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride is not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    } 

    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'Ongoing'})

    sendmessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    });

    return ride;
}

export const endRide1 = async ({ rideId, captain }) => {
    if (!rideId || !captain) {
        throw new Error('Ride ID and Captain are required');
    }

    const ride = await rideModel.findOne({ _id: rideId, captain: captain._id }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'Ongoing') {
        throw new Error('Ride is not ongoing');
    }
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'completed', completedAt: new Date() });
    return ride;
}
