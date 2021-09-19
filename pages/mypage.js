import React from 'react'
import Layout from '../components/Layout'
import { signOut } from '@firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { userContext } from '../store/userContext'

const MyPage = () => {
  const router = useRouter()
  const {setCurrentUser} = useContext(userContext)
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
  return (
    <Layout title="mypage" changePage={logout}/>
  )
}

export default MyPage
