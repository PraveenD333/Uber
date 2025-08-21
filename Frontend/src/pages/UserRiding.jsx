 import React, { useEffect, useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../Context/SocketContext'
import Livetracking1 from '../Components/Livetracking1'
import assets from '../assets/assets'

const UserRiding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    // Get captain's live location
    const [captainLocation, setCaptainLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setCaptainLocation({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    });
                },
                (err) => {
                    // fallback to ride.pickup if available
                    if (ride?.pickup) setCaptainLocation(ride.pickup);
                }
            );
        } else if (ride?.pickup) {
            setCaptainLocation(ride.pickup);
        }
    }, [ride]);

    socket.on('ride-completed',()=>{
        navigate('/home')
    })

    const completedRide = async () => {
        navigate('/home')
    }


    return (
        <div className='h-screen'>
            <div className='h-1/2'>
                <Livetracking1
                    pickup={captainLocation}
                    destination={ride?.destination}
                />
            </div>

            <div className='h-1/2 p-4 bg-black text-white'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src={assets.ok} />

                    <div className='text-right'>
                        <h2 className='text-lg font-semibold capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-sm font-semibold'>{ride?.captain.phone}</h4>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                    </div>
                </div>

                <div className='flex gap-2  justify-between flex-col items-center'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-2'>
                            <i className="text-lg ri-money-rupee-circle-line"></i>
                            <div>
                                <h3 className='text-lg font-semibold'>Cash</h3>
                                <p className='text-sm -mt-1 font-bold text-green-600'>{ride?.fare}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-5 p-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-semibold'>Destination</h3>
                                <p className='text-sm -mt-1'>{ride?.destination}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between -mt-6 gap-5'>
                    <button className='w-full mt-5 bg-white text-black font-semibold p-2 rounded-3xl'>Make A Payment</button>
                    <button
                    onClick={completedRide} 
                    className='w-full mt-5 bg-white text-black font-semibold p-2 rounded-3xl'>Done</button>
                </div>

            </div>
        </div>
    )
}

export default UserRiding;