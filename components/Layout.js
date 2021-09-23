import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  Container
} from "@chakra-ui/react";
import Head from 'next/head';
import { auth } from '../firebase';
import { signOut } from '@firebase/auth';
import { useContext } from 'react';
import { userContext } from "../store/userContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuthStatus } from "../hooks/useAuthStatus";


const Layout = (props) => {
  const children = props.children
  const title = props.title
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleToggle = () => (isOpen ? onClose() : onOpen())
  const {currentUser,setCurrentUser} = useContext(userContext)
  const router = useRouter()
  
  const signin = () => router.push("/signin")
  
  const logout = async () => {
    await signOut(auth).then(()=>{
      setCurrentUser({
        id:"",
        username: "",
        avatarUrl: null
      })
      alert("ログアウトしました")
      router.push("/")
    }).catch((err)=>{
      alert(err)
    })
  }
  let logBtnName = ""
  let changePageEvent
  if(currentUser.id){
    logBtnName  = "Logout"
    changePageEvent = logout
  }else{
    switch(title){
      case "Signin":
        logBtnName = "Create acount"
        changePageEvent = props.changePage
        break
      case "Signup":
        logBtnName = "Sign in"
        changePageEvent = props.changePage
        break
      default: 
        logBtnName  = "Sign in"
        changePageEvent = signin
    }
  }
  return (
    <>
      <Head title={title} />
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Link href="/todos">
            <Heading as="h1" size="lg" letterSpacing={"tighter"} _hover={{ cursor:"pointer", opacity: "0.8"}}>
              Nextjs-Todo
            </Heading>
          </Link>
        </Flex>
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <Button
            variant="outline"
            _hover={{ bg: "teal.700", borderColor: "teal.700" }}
            onClick={changePageEvent}
          >
            {logBtnName}
          </Button>
        </Box>
      </Flex>
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
