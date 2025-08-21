import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import { SocketContext } from '../Context/SocketContext'
import { CaptainDataContext } from '../Context/CaptainContext'
import axios from 'axios'
import assets from '../assets/assets'
import toast from 'react-hot-toast'


const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

  const ridePopUpPanelRef = useRef(null)
  const confirmRridePopUpPanelRef = useRef(null)



  // Animation for Ride PopUp Panel
  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(ridePopUpPanelRef.current, { transform: 'translateY(100%)' })
    }
  }, [ridePopUpPanel])

  // Animation for Confirm Ride PopUp Panel
  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRridePopUpPanelRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(confirmRridePopUpPanelRef.current, { transform: 'translateY(100%)' })
    }
  }, [confirmRidePopUpPanel])

  // Logout Function
  const navigate = useNavigate()

  const handleLogout = async () => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.status === 200) {
      localStorage.removeItem('token')
      navigate('/captain-login')
      toast.success('Logout Successful')
    }
  } catch (err) {
    console.error('Logout failed:', err)
    toast.error('Logout Failed')
  }
}


  // Connect the Socket...
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: 'captain' })


    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          // console.log({
          //   userId: captain._id,
          //   location: {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude
          //   }
          // });
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }
    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
  })


  socket.on('new-ride', (data) => {
    // console.log(data)
    setRide(data)
    setRidePopUpPanel(true)
  })

  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    setRidePopUpPanel(false)
    setConfirmRidePopUpPanel(true)
  }

  return (
    <div className='h-screen bg-black text-white'>

      <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
        <img className='w-24 h-auto mb-10' src={assets.uber_Logo} alt="" />
        <button
          onClick={handleLogout}
          className='h-10 w-10 bg-black text-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-bold ri-logout-box-line"></i>
        </button>
      </div>

      <div className='h-3/5'>
        <img className='object-cover w-full h-full' src={assets.location} alt="" />
      </div>

      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>

      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-black px-3 py-10 pt-12'>
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide} />
      </div>

      <div ref={confirmRridePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-black px-3 py-10 pt-12'>
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  )
}

export default CaptainHome