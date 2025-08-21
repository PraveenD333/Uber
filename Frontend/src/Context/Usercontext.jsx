import React, { createContext, useState } from 'react'

export const UsercontextData = createContext()

const Usercontext = ({children}) => {

    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })
  return (
    <div>
        <UsercontextData.Provider value={{user, setUser}}>
            {children}
        </UsercontextData.Provider>
    </div>
  )
}

export default Usercontext
