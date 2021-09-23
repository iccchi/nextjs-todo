import React, { useEffect,useState } from 'react'
import { db } from '../../../firebase';
import { collection, getDocs, onSnapshot, doc, query, orderBy, addDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useAuthStatus } from '../../../hooks/useAuthStatus';
import DetailTodo from '../../../components/DetailTodo';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import { Box, HStack,useColorModeValue, Heading, Button, Input,Flex, Stack, StackDivider} from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { userContext } from '../../../store/userContext';
import Comment from '../../../components/Comment';


const DetailPage = ({uid}) => {
  const router = useRouter()
  const [todo, setTodo] = useState({})
  const [comments, setComments] = useState([])
  const [comment, setCooment] = useState("")
  const {currentUser} = useContext(userContext)


  const addComment = async() => {
    const date = new Date()
    const docComment = await addDoc(collection(db, "todolists", uid, "comments"), {
      createdAt: date.getTime(),
      userId: currentUser.id,
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
      comment: comment,
    }).then(()=>{
      setCooment("")
    }).catch((err)=>{
      alert(err.message)
    })
  }

  useEffect(()=>{
    if(router.isFallback){
      return router.push("/todos")
    }
    const unsub = onSnapshot(doc(db, "todolists", uid), (snapshot)=>{
      console.log(snapshot.data())
      if(!snapshot.data()){
        router.push("/todos")
        return 
      } 
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
    const q = query(collection(db, "todolists", uid, "comments"), orderBy("createdAt", "asc"))
    const unComments = onSnapshot(q, (querySnapshot)=>{
      setComments(
        querySnapshot.docs.map(comment=>{
          return{
            id: comment.id,
            comment: comment.data().comment,
            username: comment.data().username,
            avatarUrl: comment.data().avatarUrl,
            userId: comment.data().userId,
            createdAt: comment.data().createdAt
          }
        })
      )
    })
    return () => {
      unsub()
      unComments()
    }
  }, [])
  useAuthStatus(`todos/${uid}/`, false)
  console.log(currentUser)
  return (
    <>
    <Layout>
      <DetailTodo todo={todo} />
      
        
          <Heading 
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            <Box mb={3}>
              コメント一覧
            </Box>
          </Heading>
          {currentUser.id && (
            <Box flex="1">
              <HStack>
                <Input type="text" value={comment} onChange={e=>setCooment(e.target.value)}/>
                <Button>
                  <AddIcon  onClick={addComment}/>
                </Button>
              </HStack>
            </Box>
          )}
        {comments && (
          <Stack spacing={4} mt={5} overflow="auto" maxH="45vh" boxShadow="2xl" borderRadius="2xl" divider={<StackDivider borderColor="gray.200"  align="stretch"/>}>
          {
            comments.map((comment)=>{
              return <Comment key={comment.id} comment={comment} todo={todo} currentUser={currentUser}/>
            })
          }
          </Stack>
        )}
    </Layout>
    <Footer/>
    </>
  )
}

export default DetailPage

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






