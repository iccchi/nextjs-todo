import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'
import { signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { auth } from '../firebase'
import Form from '../components/Form'
import { useContext, useEffect } from 'react'
import { userContext } from '../store/userContext'
import { useAuthStatus } from '../hooks/useAuthStatus'
const SigninPage = () => {
  const { setCurrentUser, currentUser } = useContext(userContext)
  const router = useRouter()
  const ToSignupPage = () => {
    router.push("/signup")
  }

  const signin = async(email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>{
        setCurrentUser({
          id: userCredential.user.uid,
          username: userCredential.user.displayName,
          avatarUrl: userCredential.user.photoURL,
          createdAt: userCredential.user.metadata.createdAt,
          lastLoginAt: userCredential.user.metadata.lastLoginAt,
        })
        
        router.push("/mypage")
      }).catch(err=>{
        alert(err.message)
      })
  }
  useAuthStatus("mypage", false)

  return (
    <Layout title="Signin" changePage={ToSignupPage}>
      <Form authEvent={signin} isLogin={true}/>
    </Layout>
  )
}

export default SigninPage
