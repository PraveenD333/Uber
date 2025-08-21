import { createContext, useContext, useState } from 'react';


export const CaptainDataContext = createContext();

// Create a provider component
const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        },
        vehicle: {
            color: '',
            plate: '',
            capacity: '',
            type: ''
        }
    });

    const value = {
        captain,
        setCaptain,
    };

    return (
        <CaptainDataContext.Provider value={ value }>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;