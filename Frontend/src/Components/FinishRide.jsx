import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'

const FinishRide = (props) => {

    const navigate = useNavigate()
        
    async function endride(){
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.status === 200) {
            navigate('/captain-home')
        }
    }
  return (
        <div className='bg-black text-white'>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {props.setFinishRidePanel(false)}}>
          <i className=" text-3xl ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-xl font-bold mb-5'>Finish This Ride...</h3>

        <div className='flex items-center justify-between p-3 bg-black rounded-xl mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-10 w-10  rounded-full object-cover' src={assets.person1}/>
                <h2 className='text-lg font-semibold capitalize text-white'>{props.ride?.user.fullname.firstname}</h2>
            </div>
            <h5 className='text-lg font-semibold text-white'>{props.ride?.distanceKm}Km</h5>
        </div>
        <p className=' ml-16 -mt-5  relative text-sm text-white'>{props.ride?.user.phone}</p>


        <div className='flex gap-2  justify-between flex-col items-center'>
         <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-2'>
                <i className="text-lg ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-semibold'>Pickup</h3>
                    <p className='text-sm -mt-1'>{props.ride?.pickup}</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-2'>
                <i className ="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-semibold'>Destination</h3>
                    <p className='text-sm -mt-1'>{props.ride?.destination}</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-2'> 
                <i className="text-lg ri-money-rupee-circle-line"></i>
                <div>
                    <h3 className='text-lg font-semibold'>Cash</h3>
                    <p className='text-sm -mt-1 text-green-600 font-bold'>{props.ride?.fare}</p>
                </div>
            </div>
        </div> 
             
            <button 
            onClick={endride}
            className='w-full mt-5 h-12 flex justify-center text-lg bg-white text-black  p-3 rounded-3xl'>Finish Ride </button>

            <p className='text-red-400 mt-1 text-xs text-center font-semibold'>Click On Finish Ride If You Have Completed The Payment...!</p>

    
        </div>
    </div>
  )
}

export default FinishRide