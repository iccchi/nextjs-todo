import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import UserContextProvider from '../store/userContext'


function MyApp({ Component, pageProps }) {
  return(
    <ChakraProvider>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
