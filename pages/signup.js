import React, { useState } from 'react'
import Layout from "../components/Layout"
import { useRouter } from 'next/router'
import Form from '../components/Form'
import {auth, storage} from "../firebase"
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import { updateProfile } from '@firebase/auth'
import { useAuthStatus } from '../hooks/useAuthStatus'
import { userContext } from '../store/userContext'
import { useContext } from 'react'

const SignupPage = () => {
  const router = useRouter()
  const { setCurrentUser } = useContext(userContext)
  const ToSigninPage = () => {
    router.push("/signin")
  }

  const signup = async (email, password, displayName, avatarImage) => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then( async (userCredential)=>{
      let url=""
      if(avatarImage){
        const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
          .map((n) => S[n % S.length])
          .join("")
        const fileName = randomChar + "_" + avatarImage.name
        await uploadBytes(ref(storage, `avatars/${fileName}`), avatarImage)
        url = await getDownloadURL(ref(storage, `avatars/${fileName}`))
      }
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: url
      })
      
      setCurrentUser({
        id: userCredential.user.uid,
        username: userCredential.user.displayName,
        avatarUrl: userCredential.user.photoURL,
        createdAt: userCredential.user.metadata.createdAt,
        lastLoginAt: userCredential.user.metadata.lastLoginAt,
      })
      
      router.push("/mypage")
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }

  useAuthStatus("mypage", false)
  return (
    <Layout title="Signup" changePage={ToSigninPage}>
      <Form authEvent={signup} IsLogin={false}/>
    </Layout>
  )
}

export default SignupPage
