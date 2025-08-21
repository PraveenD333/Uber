import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import assets from '../assets/assets'
import { images } from '../assets/assets'

const Start = () => {

   const [currentImageIndex, setCurrentImageIndex] = useState(0)

     useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change image every 3seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
        <div className='h-screen pt-5 flex justify-between flex-col w-full bg-cover bg-center transition-all duration-1000' style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
            <img className='w-28 h-auto ml-7' src={assets.uber_Logo1}/>
            <div className='pb-4 py-4 px-4'>
                <h2 className='text-[30px] font-bold text-center text-white'>Get Started With Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-white text-black font-semibold  py-3 rounded-2xl mt-2'>Continue</Link>
            </div>
        </div>
    </div> 
  )
}

export default Start


