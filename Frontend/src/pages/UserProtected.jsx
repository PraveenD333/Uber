import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { UsercontextData } from '../Context/Usercontext'
import axios from 'axios'

const UserProtected = ({children}) => {

    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    const { user, setUser } = useContext(UsercontextData)
    const [ isLoading, setIsLoading ] = useState(true)


    useEffect(()=>{
        if(!token){
            navigate('/login')
        }  

         axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 200) {
                setUser(res.data.user)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [token])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

  return (
  <>
    {children}
  </>
  )
}

export default UserProtected