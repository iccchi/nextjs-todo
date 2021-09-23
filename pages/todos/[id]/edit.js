import React, { useEffect,useState } from 'react'
import { db } from '../../../firebase';
import { collection, getDocs, onSnapshot, doc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useAuthStatus } from '../../../hooks/useAuthStatus';
import Layout from '../../../components/Layout';
import EditTodo from '../../../components/EditTodo';
import Footer from '../../../components/Footer';


const EditPage = ({uid}) => {
  const [todo, setTodo] = useState({})
  const router = useRouter()
  useEffect(()=>{
    if(router.isFallback){
      return router.push("/todos")
    }
    const unsub = onSnapshot(doc(db, "todolists", uid), (snapshot)=>{
      console.log(snapshot.data())
      setTodo({
        uid,
        userId: snapshot.data().userId,
        username: snapshot.data().username,
        avatarUrl: snapshot.data().avatarUrl,
        title: snapshot.data().title,
        status: snapshot.data().status,
        limitTime: snapshot.data().limitTime,
        createdAt: snapshot.data().createdAt
      })
    })
    return () => unsub()
  }, [])
  useAuthStatus(`todos/${uid}/edit`)
  
  return (
    <>
      <Layout>
        <EditTodo todo={todo}/>
      </Layout>
      <Footer />
    </>
  )
}

export default EditPage

export const getStaticPaths = async() => {
  const querySnapshot = await getDocs(collection(db, "todolists"))
  const todoids = querySnapshot.docs.map((doc)=>{
    return doc.id
  })
  const todopaths =todoids.map((id)=>{
    return{
      params:  {id}
    }
  })
  return{
    paths: todopaths,
    fallback: true
  }
}

export const getStaticProps = async({params}) => {
  const uid = params.id
  return {props: { uid }}
}