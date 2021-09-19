import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { auth } from '../firebase'
import { onAuthStateChanged } from '@firebase/auth'
import { useContext } from 'react'
import { userContext } from '../store/userContext'
import { useRouter } from 'next/router'

export default function Home() {
  const { setCurrentUser, currentUser } = useContext(userContext)
  const router = useRouter()

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      if(user){
        setCurrentUser({
          id: user.uid,
          username: user.displayName,
          avatarUrl: user.photoURL
        })
        router.push("/mypage")
      }else{
        setCurrentUser({
          id:"",
          username: "",
          avatarUrl: null
        })
        router.push("/signin")
      }
    })
    return () => unSub()
  },[])
  console.log("aaa")
  console.log(currentUser)
  return (
    <Layout title="index">
      Loading ...
    </Layout>
  )
}
