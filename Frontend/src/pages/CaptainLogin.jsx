import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext'
import axios from 'axios'
import assets from '../assets/assets'
import toast from 'react-hot-toast'

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { captain, setCaptain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const CaptainData = {
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, CaptainData)
            if (response.status === 200) {
                const data = response.data
                setCaptain(data.captain)
                localStorage.setItem('token', data.token)
                navigate('/captain-home')
                toast.success('Login Successfully')
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            const msg = error.response?.data?.message || 'Login Failed'
            toast.error(msg)
        }
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between bg-black text-white'>
            <div>
                <img className='w-24 h-auto mb-10 ' src={assets.uber_Logo1} />

                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <h3 className='text-lg font-medium mb-2 text-white'>Email</h3>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-black mb-7 rounded px-2 py-2 border-black  w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder="Email@example.com"
                        required />

                    <h3 className='text-lg font-medium mb-2 text-white'>Password</h3>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-black mb-7 rounded px-2 py-2 border-black w-full text-lg placeholder:text-base'
                        type="password"
                        placeholder="*********"
                        required />

                    <button className='bg-white text-black mb-3 px-2 py-2  w-full  placeholder:text-base rounded-2xl'>
                        Login</button>
                    <p className='text-center text-white'>New Captain?  <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
                </form>
                <div>
                    <p className='text-[10px] leading-tight text-center mt-2 text-white'>By Proceeding, you consent to get calls, WhatsApp or SMS Messages, Including by Automated Means, form
                        Uber and it's affiliates to the Number Provided </p>
                </div>
            </div>
            <div>
                <Link to='/login'
                    className='bg-white flex items-center justify-center text-black  mb-7 px-2 py-2  w-full  placeholder:text-base rounded-2xl'>
                    Login in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin