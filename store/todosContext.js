import { createContext, useState } from "react";

export const todosContext = createContext()


const todosContextProvider = ({children}) => {
  const [todos, setTodos] = useState([])

  return (
    <todosContext.Provider value={{todos, setTodos}}>
      {children}
    </todosContext.Provider>
  )
}

export default todosContextProvider
