import { createContext, useState } from "react";

export const userContext = createContext()


const UserContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    username:"",
    avatarUrl: null,
    createdAt: "",
    lastLoginAt: "", 
  })
  return (
    <userContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </userContext.Provider>
  )
}

export default UserContextProvider


