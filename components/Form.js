import React, {useState} from 'react'
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
import { createUserWithEmailAndPassword } from '@firebase/auth'

const Form = ({authEvent, isLogin}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [avatarImage, setAvatarImage] = useState(null);

  const onChangeImageHandler = (e) => {
    if(e.target.files[0]){
      setAvatarImage(e.target.files[0])
    }
  }

  return (
    <Stack spacing={4}>
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
        <Button
          isLoading={false}
          loadingText="Loading"
          colorScheme="teal"
          variant="outline"
          spinnerPlacement="start"
          onClick={()=>authEvent(email, password, displayName, avatarImage)}
        >
          {isLogin ? "Login" : "SignUp"}
        </Button>
      </Center>
    </Stack>
  )
}

export default Form
