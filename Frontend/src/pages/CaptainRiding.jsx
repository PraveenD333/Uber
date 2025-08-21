import { useRef, useState } from 'react'
import { Link,useLocation} from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../Components/FinishRide'
import Livetracking from '../Components/Livetracking'
import { useEffect } from 'react'


const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

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
                    // fallback to rideData.pickup if available
                    if (rideData?.pickup) setCaptainLocation(rideData.pickup);
                }
            );
        } else if (rideData?.pickup) {
            setCaptainLocation(rideData.pickup);
        }
    }, [rideData]);

    useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(finishRidePanelRef.current, { transform: 'translateY(100%)' })
    }
  }, [finishRidePanel])

  return (
        <div className='h-screen'>

      <div className='h-4/5'>
      <Livetracking
      pickup={captainLocation}
      destination={rideData?.destination}/>
      </div>

      <div className='h-1/5 p-6 flex items-center justify-between relative bg-black'
      onClick={() => {
        setFinishRidePanel(true)
      }}>
          <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {{}}}>
          <i className=" text-3xl text-white ri-arrow-up-wide-line"></i></h5>
        <h4 className='text-xl font-semibold text-white'>{rideData?.distanceKm}Km</h4>
        <button className='bg-white text-black font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
      </div>
        <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-black px-3 py-10 pt-12'>
            <FinishRide 
            ride={rideData}
            setFinishRidePanel={setFinishRidePanel}/>
        </div>    
    </div>
  )
}

export default CaptainRiding