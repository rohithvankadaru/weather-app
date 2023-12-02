import { useState } from "react"
import { userContext } from "./userContext"

export const UserProvider = ({children}) => {

    const [token, setToken] = useState('');

    return (
        <userContext.Provider value={{token, setToken}}>
            {children}
        </userContext.Provider>
    )
}