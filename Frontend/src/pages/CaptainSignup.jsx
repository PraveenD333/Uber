import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext'
import axios from 'axios'
import assets from '../assets/assets'
import toast from 'react-hot-toast'

const CaptainSignup = () => {
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const usenavigate=useNavigate()

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const CaptainUserData = {
      fullname: {
        firstname: FirstName,
        lastname: LastName
      },
      phone: phone,
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    try{ 
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register` , CaptainUserData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain);
      localStorage.setItem('token', data.token)
      usenavigate('/captain-home')
      toast.success('Account Created Successfully')
    }else {
      toast.error('Account Creation Failed')
    }
  }catch (error) {
    // Handle validation errors and other backend errors
    if (error.response?.data?.errors) {
      // Show all validation errors
      error.response.data.errors.forEach(err => toast.error(err.msg));
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Account Creation Failed');
    }
  }
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  }
  
  return (
    <div className='p-6 h-[150%] flex flex-col justify-between bg-black text-white'>
      <div>
        <img className='w-24 h-auto mb-9' src={assets.uber_Logo1} />

        <form onSubmit={(e) => { handleSubmit(e) }}>

          <h3 className='text-lg font-medium text-white mb-1'>What's our Captain's Name</h3>
          <div className='flex gap-7 mb-5'>
            <input
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-black w-1/2 rounded px-2 py-2 border-black text-lg placeholder:text-sm'
              type="text"
              placeholder="First Name"
              required />
            <input
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              className='bg-black w-1/2 rounded px-2 py-2 border-black text-lg placeholder:text-sm'
              type="text"
              placeholder="Last Name"
              required />
          </div>

          <h3 className='text-lg font-medium text-white m-1'>Enter Captain's Phone Number</h3>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='bg-black mb-5 rounded px-2 py-2 border-black w-full text-lg placeholder:text-sm'
            type="text"
            placeholder="Phone Number"
            required />

          <h3 className='text-lg font-medium text-white m-1'>Enter Captain's Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-black mb-5 rounded px-2 py-2 border-black w-full text-lg placeholder:text-sm'
            type="email"
            placeholder="Email@example.com"
            required />

          <h3 className='text-lg font-medium text-white m-1'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-black mb-5 rounded px-2 py-2 border-black w-full text-lg placeholder:text-sm'
            type="password"
            placeholder="Password"
            required />

          <h3 className='text-lg font-medium text-white m-1'>Vehicle Information</h3>
          <div className='flex gap-7 mb-5'>
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className='bg-black rounded px-4 border-black w-1/2 text-lg placeholder:text-sm placeholder:text-center'
              type="text"
              placeholder="Vehicle Color"
              required />
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className='bg-black rounded px-4 border-black w-1/2 text-lg placeholder:text-sm placeholder:text-center'
              type="text"
              placeholder="Vehicle Plate No"
              required />
          </div>
  
          <div className='flex gap-4 mb-7'>
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className='bg-black text-white rounded px-4 border-black w-full text-lg placeholder:text-sm placeholder:text-center'
              type="number"
              placeholder="Vehicle Capacity"
              required />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className='bg-black rounded px-4 py-2 border-black w-full text-xs text-center text-white placeholder:text-sm placeholder:text-center'
              required>
              <option value="" disabled className='text-white'>Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Auto">Auto</option>
              <option value="Motorcycle">Motorcycle</option>
            </select>
          </div>
  
          <button
            className='bg-white text-black font-semibold mb-4 px-3 py-2 w-full text-lg rounded-2xl'
          >Create Captain Account</button>
          <p className='text-center text-white'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
        </form>
      </div>
  
      <div>
        <p className='text-[10px] leading-tight text-white'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
  
}

export default CaptainSignup