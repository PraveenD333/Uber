import { useContext } from 'react'
import { UsercontextData } from './Context/Usercontext'
import { CaptainDataContext } from './Context/CaptainContext'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainHome from './pages/CaptainHome'
import UserProtected from './pages/UserProtected'
import CaptainProtected from './pages/CaptainProtected'
import CaptainRiding from './pages/CaptainRiding'
import UserRiding from './pages/UserRiding'

const App = () => {
  const ans1 = useContext(UsercontextData)
  const ans2 = useContext(CaptainDataContext)

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Start />} />

        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/home' element={<UserProtected><Home /></UserProtected>} />

        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-home' element={<CaptainProtected><CaptainHome /></CaptainProtected>} />

        <Route path='/riding' element={<UserRiding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />


      </Routes>
    </div>
  )
}

export default App