import React from 'react'

const WaitForDriver = (props) => {
  return ( 
        <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => {props.waitForDriver(false)}}>
          <i className=" text-3xl text-white ri-arrow-down-wide-line"></i></h5>

          <div className='flex items-center justify-between'> 
         <img className='h-12' src={props.selectedVehicleImage} alt="car" />
          
          <div className='text-right'>
            <h3 className='text-lg font-semibold capitalize'>{props.ride?.captain.fullname.firstname}</h3>
            <h4 className='text-sm font-semibold'>{props.ride?.captain.phone}</h4>
            <h2 className='text-lg font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h2>
            
          </div>
          </div>

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
                    <p className='text-sm -mt-1 font-bold text-green-600'>{props.ride?.fare}</p>
                </div>
            </div>
            <h1 className='text-2xl font-semibold text-center'>OTP</h1>
            <div className='w-full mt-2 h-12 text-lg text-center flex justify-center bg-white text-black p-2 rounded-3xl'>
                <h1 className='text-2xl font-semibold'>{props.ride?.otp}</h1>
            </div>
        </div> 
        </div>
    </div>
  )
}

export default WaitForDriver