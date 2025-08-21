import React from 'react'

const LookingForDriver = (props) => {
  return ( 
        <div>
        <h5 className='p-1 text-center w-[93%] absolute top-3'
        onClick={() => {props.setVehicleFound(false)}}>
          <i className=" text-3xl ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Looking For a Driver</h3>

        <div className='flex gap-1  justify-between flex-col items-center'>
        <img className='h-20' src={props.selectedVehicleImage} alt="car" />
        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-2'>
                <i className="text-lg ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-semibold'>Pickup</h3>
                    <p className='text-sm -mt-1'>{props.pickup}</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-2'>
                <i className ="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-semibold'>Destination</h3>
                    <p className='text-sm -mt-1'>{props.destination}</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-2'> 
                <i className="text-lg ri-money-rupee-circle-line"></i>
                <div>
                    <h3 className='text-lg font-semibold'>Cash</h3>
                    <p className='text-sm -mt-1 text-green-600 font-bold'>{props.fare[props.vehicleType]}</p>
                </div>
            </div>
        </div> 
        </div>
    </div>
  )
}

export default LookingForDriver