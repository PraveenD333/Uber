import React from 'react'
import assets from '../assets/assets'

const RidePopUp = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {props.setRidePopUpPanel(false)}}>
          <i className=" text-3xl ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-xl font-bold mb-5'>New Ride..!</h3>

        <div className='flex items-center justify-between p-3 bg-black rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-10 w-10  rounded-full object-cover' src={assets.person1}/>
                <h2 className='text-lg font-semibold text-white capitalize'>{props.ride?.user.fullname.firstname+ " " + props.ride?.user.fullname.lastname}</h2>
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
        <button onClick={()=>{ 
            props.setConfirmRidePopUpPanel(true)
            props.confirmRide()
        }} className='mt-5 w-full bg-white text-black p-2 rounded-3xl'>Accept</button>

            <button onClick={()=>{ props.setRidePopUpPanel(false)
        }} className='mt-2 w-full bg-white text-red-500  font-semibold p-2 rounded-3xl'>Ignore</button>
        </div>
    </div>
  )
}

export default RidePopUp