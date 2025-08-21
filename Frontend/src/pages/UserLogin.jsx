import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UsercontextData } from '../Context/Usercontext'
import axios from 'axios'
import assets from '../assets/assets'
import toast from 'react-hot-toast'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user, setUser } = useContext(UsercontextData);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUserData = {
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUserData)
            if (response.status === 200) {
                const data = response.data
                setUser(data.user)
                localStorage.setItem('token', data.token)
                navigate('/home')
                toast.success('Login Successfully', {
                    style: {
                        background: 'black',
                        color: 'white',
                    }
                })
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            const msg = error.response.data.message || 'Login Failed';
            toast.error(msg, {
                style: {
                    background: 'black',
                    color: 'white',
                }
            });
        }
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 h-auto mb-10' src={assets.uber_Logo} />

                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <h3 className='text-lg font-medium mb-2'>Email</h3>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-white mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder="Email@example.com"
                        required />

                    <h3 className='text-lg font-medium mb-2'>Password</h3>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-white mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
                        type="password"
                        placeholder="*********"
                        required />

                    <button className='bg-black text-white mb-3 px-2 py-2 w-full  placeholder:text-base rounded-2xl'>
                        Login</button>
                    <p className='text-center'>New User?  <Link to='/signup' className='text-blue-600'>Create New Account</Link></p>
                </form>
                <div>
                    <p className='text-[10px] leading-tight text-center mt-2'>By Proceeding, you consent to get calls, WhatsApp or SMS Messages, Including by Automated Means, form
                        Uber and it's affiliates to the Number Provided </p>
                </div>
            </div>
            <div>
                <Link to='/captain-login'
                    className='bg-black flex items-center justify-center text-white  mb-7 px-2 py-2  w-full  placeholder:text-base rounded-2xl'>
                    Login in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin