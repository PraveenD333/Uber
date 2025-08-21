import React from 'react'
import assets from '../assets/assets'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={() => {props.setVehiclePanel(false)}}>
          <i className=" text-3xl ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

    <div onClick={()=>{
      props.setConfirmRidePanel(true)
      props.selectVehicle('car')
      props.setSelectedVehicleImage(assets.car)
      props.setVehiclePanel(false)}}
            className='flex border-2 active:border-black bg-gray-300 rounded-xl mb-2 w-full p-3 items-center justify-between'>
          <img className='h-12' src={assets.car}/>
          <div className=' ml-2 w-1/2'>
            <h4 className='font-medium text-lg'>Uber Car <span><i className="ri-user-3-fill"></i></span>4</h4>
            <h5 className='font-medium text-sm'>5 mins Away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
        </div>

    <div onClick={()=>{
      props.setConfirmRidePanel(true )
      props.selectVehicle('auto') 
      props.setSelectedVehicleImage(assets.auto)
      props.setVehiclePanel(false)}}  
            className='flex border-2 active:border-black  bg-gray-300 rounded-xl mb-2 w-full p-3 items-center justify-between'>
          <img className='h-12' src={assets.auto} />
          <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-lg'>Uber Auto<span><i className="ri-user-3-fill"></i></span>3</h4>
            <h5 className='font-medium text-sm'>3 mins Away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
          </div>
          <h2 className='text-lg font-semibold '>₹{props.fare.auto}</h2>
        </div>

    <div onClick={()=>{
      props.setConfirmRidePanel(true)
      props.selectVehicle('moto')
      props.setSelectedVehicleImage(assets.bike)
      props.setVehiclePanel(false)}}  
            className='flex border-2 active:border-black bg-gray-300 rounded-xl mb-2 w-full p-3 items-center justify-between'>
          <img className='h-12' src={assets.bike} />
          <div className=' ml-2 w-1/2'>
            <h4 className='font-medium text-lg'>Moto<span><i className="ri-user-3-fill"></i></span>1</h4>
            <h5 className='font-medium text-sm'>2 mins Away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.moto}</h2>
        </div>


    </div>
  )
}

export default VehiclePanel