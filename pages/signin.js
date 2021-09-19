import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'
import { signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { auth } from '../firebase'
import Form from '../components/Form'
import { useContext, useEffect } from 'react'
import { userContext } from '../store/userContext'

const SigninPage = () => {
  const { setCurrentUser, currentUser } = useContext(userContext)
  const router = useRouter()
  const ToSignupPage = () => {
    router.push("/signup")
  }

  const signin = async(email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>{
        console.log(userCredential)
        setCurrentUser({
          id: userCredential.user.uid,
          username: userCredential.user.displayName,
          avatarUrl: userCredential.user.photoURL
        })
      }).catch(err=>{
        console.log(err)
      })
  }

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      if(user){
        setCurrentUser({
          id: user.uid,
          username: user.displayName,
          avatarUrl: user.photoURL
        })
        
      }else{
        setCurrentUser({
          id:"",
          username: "",
          avatarUrl: null
        })
      }
    })
    return ()=>unSub()
  },[])
  console.log("aaa")
  console.log(currentUser)

  return (
    <Layout title="Signin" changePage={ToSignupPage}>
      <Form authEvent={signin} isLogin={true}/>
    </Layout>
  )
}

export default SigninPage
