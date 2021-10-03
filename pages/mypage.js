import React from 'react'
import Layout from '../components/Layout'
import { signOut} from '@firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { userContext } from '../store/userContext'
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
