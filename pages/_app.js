import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import UserContextProvider from '../store/userContext'
import TodosContextProvider from '../store/todosContext'


function MyApp({ Component, pageProps }) {
  return(
    <ChakraProvider>
      <TodosContextProvider>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </TodosContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
