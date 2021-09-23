import React, { useState } from 'react'
import Layout from "../components/Layout"
import { useRouter } from 'next/router'
import Form from '../components/Form'
import {auth, storage} from "../firebase"
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import { updateProfile } from '@firebase/auth'
import { async } from '@firebase/util'
import { useAuthStatus } from '../hooks/useAuthStatus'

const SignupPage = () => {
  const router = useRouter()
  
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
      console.log(userCredential)
    })
    .catch((err)=>{
      console.log("aaa")
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
