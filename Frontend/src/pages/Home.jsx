import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel'
import VehiclePanel from '../Components/VehiclePanel'
import ConfirmRide from '../Components/ConfirmRide'
import LookingForDriver from '../Components/LookingForDriver'
import WaitForDriver from '../Components/WaitForDriver'
import { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { UsercontextData } from '../Context/Usercontext'
import assets from '../assets/assets'
import toast from 'react-hot-toast'

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)

  const WaitForDriverRef = useRef(null)
  const vehicleFoundRef = useRef(null)

  const [panelopen, setPanelopen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)

  const [waitForDriver, setWaitForDriver] = useState(false)



  // Handler for form submission
  const submitHandler = (e) => {
    e.preventDefault()
  }

  // Form Animation
  useGSAP(function () {
    if (panelopen) {
      gsap.to(panelRef.current, { height: '70%', opacity: 1, padding: 24 })
      gsap.to(panelCloseRef.current, { opacity: 1 })
    } else {
      gsap.to(panelRef.current, { height: '0%', opacity: 0, padding: 0 })
      gsap.to(panelCloseRef.current, { opacity: 0 })
    }
  }, [panelopen])

  // Vehicle Panel Animation
  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)' })
    }
  }, [vehiclePanel])

  // Confirm Ride Panel Animation
  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(confirmRidePanelRef.current, { transform: 'translateY(100%)' })
    }
  }, [confirmRidePanel])

  // Vehicle Found Animation
  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)' })
    }
  }, [vehicleFound])

  // Wait For Driver Animation
  useGSAP(function () {
    if (waitForDriver) {
      gsap.to(WaitForDriverRef.current, { transform: 'translateY(0)' })
    } else {
      gsap.to(WaitForDriverRef.current, { transform: 'translateY(100%)' })
    }
  }, [waitForDriver])


  // This is all About of Location Search Panel
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)


  // Logout Function
  const handleLogout = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.status === 200) {
        localStorage.removeItem('token')
        navigate('/login')
        toast.success('Logout Successful', {
          style: {
            background: 'black',
            color: 'white',
          }
        })
      }
    } catch (err) {
      console.error('Logout failed:', err)
      toast.error('Logout Failed')
    }
  }

  // Pickup for the Map Suggestions 
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);

    if (e.target.value.length < 3) {
      setPickupSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data)
    } catch {
      // handle error
    }
  }
  // Destination for the Map Suggestions
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)

    if (e.target.value.length < 3) {
      setDestinationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {

        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)

    } catch {
      // handle error
    }
  }

  // Find Trip Function
  const [fare, setFare] = useState({})

  async function findTrip() {
    setVehiclePanel(true)
    setPanelopen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data);
  }

  // Ride Created
  const [vehicleType, setVehicleType] = useState(null)
  const [selectedVehicleImage, setSelectedVehicleImage] = useState(null)
  const [rideDistance, setRideDistance] = useState(null);

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType,
      distanceKm: rideDistance
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.data && response.data.distanceKm) {
      setRideDistance(response.data.distanceKm);
    }
    // You can use rideDistance in your UI as needed
    // console.log("Create Ride Response:", response.data);
  }




  // Connect the Socket... 
  const [ride, setRide] = useState(null)
  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UsercontextData)

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })

    const handleRideConfirmed = (ride) => {
      toast.success("Your Ride is Accepted", {
        style: {
          background: 'black',
          color: 'white',
        }
      })
      setVehicleFound(false)
      setWaitForDriver(true)
      setRide(ride)
    };

    const handleRideStarted = (ride) => {
      toast.success("Your Ride is Started", {
        style: {
          background: 'black',
          color: 'white',
        }
      })
      setWaitForDriver(false)
      navigate('/riding', { state: { ride } })
    };

    socket.on('ride-confirmed', handleRideConfirmed);
    socket.on('ride-started', handleRideStarted);

    // Cleanup Listeners on unmount
    return () => {
      socket.off('ride-confirmed', handleRideConfirmed);
      socket.off('ride-started', handleRideStarted);
    };
  }, [socket, user, navigate]);

  // socket.on('ride-confirmed', ride => {
  //   toast.success("Your Ride is Accepted")
  //   setVehicleFound(false)
  //   setWaitForDriver(true)
  //   setRide(ride)
  // })
  
  // socket.on('ride-started', ride => {
  //   // console.log("ride")
  //   setWaitForDriver(false)
  //   navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
  // })


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-24 absolute left-5 top-5' src={assets.uber_Logo} alt="Uber Logo" />



      {/* Main Background GIF */}
      <div className='w-screen h-screen'>
        <img className='object-cover w-full h-full' src={assets.location} alt="Uber Logo" />
        <button
          onClick={handleLogout}
          className='h-10 w-10 bg-black text-white flex items-center justify-center rounded-full absolute right-5 top-5 z-20'>
          <i className="text-lg font-bold ri-logout-box-line"></i>
        </button>
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>

        <div className='h-[30%] p-6  bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => { setPanelopen(false) }}
            className='absolute top-6 opacity-0 right-20 text-2xl'><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-xl font-bold'>Find a Trip</h4>

          <form className='relative py-3' onSubmit={(e) => { submitHandler(e) }}>

            {/* Line Design */}
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-900 rounded-full"></div>

            <input
              onClick={() => {
                setPanelopen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pick-up Location' />

            <input
              onClick={() => {
                setPanelopen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter Your destination' />
          </form>
          <button onClick={findTrip}
            className='bg-black text-white px-4 py-3 rounded-3xl mt-4 w-full'> Find Trip </button>
        </div>


        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelopen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-13'>
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          setSelectedVehicleImage={setSelectedVehicleImage}
        />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full h-screen z-8 bottom-0 translate-y-full bg-white px-3 py-11  pt-13'>
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          selectedVehicleImage={selectedVehicleImage}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full bottom-0 translate-y-full bg-white px-3 py-10 pt-18'>
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          selectedVehicleImage={selectedVehicleImage}
          setVehicleFound={setVehicleFound} />
      </div>

      <div ref={WaitForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-black text-white px-3 py-10  pt-13'>
        <WaitForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitForDriver={setWaitForDriver}
          selectedVehicleImage={selectedVehicleImage}
          waitForDriver={waitForDriver} />
      </div>
    </div>
  )
}

export default Home 