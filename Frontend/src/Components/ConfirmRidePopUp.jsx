import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import assets from '../assets/assets'

const ConfirmRidePopUp = (props) => {
    
    const [otp,setOtp]=useState('')
    const navigate = useNavigate()

 
    const submitHandler = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params:{
                rideId: props.ride._id,
                otp: otp
            },
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.status === 200) {
            props.setConfirmRidePopUpPanel(false)
            props.setRidePopUpPanel(false)
            navigate('/captain-riding',{state:{ride:props.ride}})
        }
    }
  return ( 
    <div className='bg-black text-white'> 
        <h3 className='text-xl font-bold mb-5'>Confirm This Ride To Start...</h3>

        <div className='flex items-center justify-between p-3 bg-black rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-10 w-10  rounded-full object-cover' src={assets.person1}/>
                <h2 className='text-lg font-semibold text-white capitalize'>{props.ride?.user.fullname.firstname}</h2>
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
        <form className='w-full' onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <input value={otp} onChange={(e)=>setOtp(e.target.value)} className='bg-black px-6 py-4 text-base font-semibold text-center rounded-lg w-full mt-3' type="text" placeholder='Enter OTP' />
            <button className='w-full mt-5 h-12 text-lg text-center flex justify-center bg-white text-black p-2 rounded-3xl'>Confirm</button>
            <button onClick={()=>{ 
                props.setConfirmRidePopUpPanel(false)
                props.setRidePopUpPanel(false)
            }} className='w-full mt-2 bg-red-500 h-12 text-lg  text-white  p-3 rounded-3xl'>Cancel</button>
        </form>
        </div>
    </div>
  )
}

export default ConfirmRidePopUp