import React from 'react'
import Layout from '../components/Layout'
import { signOut,onAuthStateChanged } from '@firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { userContext } from '../store/userContext'
import { Stack, HStack, VStack } from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup, Center, Heading, Text, Button, Link, Badge, useColorModeValue,Box } from "@chakra-ui/react"
import Profile from '../components/Profile'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Footer from '../components/Footer'

const MyPage = () => {
  const router = useRouter()
  const {currentUser, setCurrentUser} = useContext(userContext)
  const logout = async () => {
    await signOut(auth).then(()=>{
      setCurrentUser({
        id:"",
        username: "",
        avatarUrl: null
      })
      router.push("/")
    }).catch((err)=>{
      alert(err)
    })
    
  }
  useAuthStatus("mypage")
  console.log(auth.currentUser)
  console.log(currentUser)
  return (
    <>
      <Layout title="mypage">
        <Profile 
          username={currentUser.username} 
          avatarUrl={currentUser.avatarUrl}
          createdAt={currentUser.createdAt}
          lastLoginAt={currentUser.lastLoginAt}
        />
      </Layout>
      <Footer />
    </>
  )
}

export default MyPage
