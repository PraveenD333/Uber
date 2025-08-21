import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UsercontextData } from '../Context/Usercontext'
import axios from 'axios'
import assets from '../assets/assets'
import toast from 'react-hot-toast'

const UserSignup = () => {
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate();

  const { user, setUser } = useContext(UsercontextData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUserData = {
      fullname: {
        firstname: FirstName,
        lastname: LastName
      },
      phone: phone,
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUserData)
      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
        toast.success('Account Created Successfully')
      }
      else {
        toast.error('Account Creation Failed')
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => toast.error(err.msg));
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Account Creation Failed');
      }
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setPhone('');
  }
  return (
    <div className='p-7 h-screen   flex flex-col justify-between'>
      <div>
        <img className='w-20 h-auto mb-10' src={assets.uber_Logo} />

        <form onSubmit={(e) => { handleSubmit(e) }}>

          <h3 className='text-lg font-medium mb-2'>What's Your Name</h3>
          <div className='flex gap-7 mb-5'>
            <input
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-white w-1/2 rounded px-2 py-2 border text-lg'
              type="text"
              placeholder="FirstName"
              required />
            <input
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              className='bg-white w-1/2 rounded px-2 py-2 border text-lg'
              type="text"
              placeholder="LastName"
              required />
          </div>
          <h3 className='text-lg font-medium mb-2'>Enter Phone Number</h3>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='bg-white mb-5 rounded px-2 py-2 border w-full text-lg'
            type="text"
            placeholder="Phone Number"
            required />
          <h3 className='text-lg font-medium mb-2'>Enter Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-white mb-5 rounded px-2 py-2 border w-full text-lg'
            type="email"
            placeholder="Email@example.com"
            required />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-white mb-5 rounded px-2 py-2 border w-full text-lg'
            type="password"
            placeholder="*********"
            required />

          <button className='bg-black text-white mb-3 px-2 py-2  w-full rounded-2xl'>
            Create Account</button>
          <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </form>
        <div>
          <p className='text-[10px] leading-tight text-center mt-2'>By Proceeding, you consent to get calls, WhatsApp or SMS Messages, Including by Automated Means, form
            Uber and it's affiliates to the Number Provided </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup