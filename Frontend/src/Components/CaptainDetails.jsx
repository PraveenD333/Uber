import {useContext} from 'react';
import { CaptainDataContext } from '../Context/CaptainContext';
import assets from '../assets/assets';


const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext); 
  return (
    <div>
                <div className='flex items-center justify-between '>
                <div className='flex items-center justify-start gap-3 '>
                  <img className='h-13 w-16 rounded-full object-cover' src={assets.person} alt="" />
                  <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname +" "+ captain.fullname.lastname}</h4>
                </div>
                <div>
                  <h4 className='text-lg font-semibold'>₹300</h4>
                  <p className='text-sm'>Earned </p>
                </div>
              </div>
              <div className='flex p-3 mt-8 bg-black rounded-xl justify-center items-start gap-5'>
                  <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>3.2</h5>
                    <p className='text-sm'>Hours Online</p>
                  </div>
                  <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-time-line"></i>
                    <h5 className='text-lg font-medium'>6.2</h5>
                    <p className='text-sm'>Hours Online</p>
                    </div>
                  <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-book-line"></i>
                    <h5 className='text-lg font-medium'>9.2</h5>
                    <p className='text-sm'>Hours Online</p>
                    </div>
              </div>
    </div>
  )
}

export default CaptainDetails