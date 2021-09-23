import React, {useState, useContext} from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button, 
  Center,
  Box,
  Stack
} from "@chakra-ui/react"
import {auth} from "../firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { userContext } from '../store/userContext'
import { useRouter } from 'next/router'

const Form = ({authEvent, isLogin}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [avatarImage, setAvatarImage] = useState(null);
  const {currentUser, setCurrentUser} = useContext(userContext)
  const provider = new GoogleAuthProvider()
  const onChangeImageHandler = (e) => {
    if(e.target.files[0]){
      setAvatarImage(e.target.files[0])
    }
  }

  const googleSignIn = async() => {
    signInWithPopup(auth, provider)
      .then((result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
        setCurrentUser({
          id: user.uid,
          username: user.displayName,
          avatarUrl: user.photoURL
        })

      }).catch((err)=>{
        alert(err.message)
      })
  }

  return (
    <Stack spacing={4} mt={10}>
      {isLogin || (
        <>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input value={displayName} onChange={e=>setDisplayName(e.target.value)} type="text" />
          </FormControl>
          <Box>
            <FormLabel>Avatar Image</FormLabel>
            <input type="file" onChange={onChangeImageHandler}/>
          </Box>
        </>
      )}
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input value={email} onChange={e=>setEmail(e.target.value)} type="email" />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
      </FormControl>
      <Center h="5rem">
        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            isLoading={false}
            loadingText="Loading"
            colorScheme="blue"
            variant="outline"
            spinnerPlacement="start"
            onClick={googleSignIn}
          >
            Google
          </Button>
          <Button
            isDisabled={isLogin ? (!email || password.length<8) : (!email || password.length<8 || !avatarImage || !username)}
            isLoading={false}
            loadingText="Loading"
            colorScheme="teal"
            variant="outline"
            spinnerPlacement="start"
            onClick={()=>authEvent(email, password, displayName, avatarImage)}
          >
            {isLogin ? "Login" : "SignUp"}
          </Button>
        </Stack>
      </Center>
    </Stack>
  )
}

export default Form
