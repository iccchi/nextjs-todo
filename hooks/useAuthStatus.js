import { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { userContext } from '../store/userContext';
import { useRouter } from 'next/router';

export const useAuthStatus = () => {
  const {currentUser, setCurrentUser} = useContext(userContext)
  const router = useRouter()
  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      if(user){
        const createdStamp = new Date(parseInt(user.metadata.createdAt))
        const lastloginStamp = new Date(parseInt(user.metadata.lastLoginAt))
        const createdDate = createdStamp.getFullYear()+"/"+(createdStamp.getMonth()+1)+"/"+(createdStamp.getDate())
                            +" "+createdStamp.getHours()+":"+createdStamp.getMinutes()
        const lastLoginDate = lastloginStamp.getFullYear()+"/"+(lastloginStamp.getMonth()+1)+"/"+(lastloginStamp.getDate())
                            +" "+lastloginStamp.getHours()+":"+lastloginStamp.getMinutes()
        setCurrentUser({
          id: user.uid,
          username: user.displayName,
          avatarUrl: user.photoURL,
          createdAt: createdDate,
          lastLoginAt: lastLoginDate, 
        })
      }else{
        setCurrentUser({
          id:"",
          username: "",
          avatarUrl: null,
          createdAt: "",
          lastLoginAt: "", 
        })
        router.push("/signin")
      }
    })
    return () => unSub()
  },[])
}