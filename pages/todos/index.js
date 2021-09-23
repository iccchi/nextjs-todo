import React, { useEffect, useContext, useState } from 'react'
import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import { useAuthStatus } from '../../hooks/useAuthStatus'
import { collection, getDocs, doc, onSnapshot, query, orderBy } from '@firebase/firestore'
import { db } from '../../firebase'
import { todosContext } from '../../store/todosContext'
import { Select,Radio, RadioGroup, HStack, Stack,Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption, Button} from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'
import Todo from '../../components/Todo'
import Link from 'next/link'

const Todos = () => {
  const {todos, setTodos} = useContext(todosContext)

  const [sortStatus, setSortStatus] = useState("id")
  const [order, setOrder] = useState("up")
  const [fileterState, setFileterState] = useState("all")
  const [changeTodo, setChangeTodo] = useState(true)
  const [displayTodos, setDisplayTodos] = useState([])

  useEffect(()=>{
    const q = query(
      collection(db,"todolists"),
      orderBy("createdAt","desc")
    );
    const unSub = onSnapshot(q, (snapshot)=>{
      setTodos(
        snapshot.docs.map((todo, index)=>{
          return{
            id: index,
            uid: todo.id,
            userId: todo.data().userId,
            username: todo.data().username,
            avatarUrl: todo.data().avatarUrl,
            title: todo.data().title,
            status: todo.data().status,
            limitTime: todo.data().limitTime,
            createdAt: todo.data().createdAt
          }
        })
      )
    })
    return () => unSub()
  }, [])

  useEffect(()=>{
    let newSortTodos=[]
    if(order==="up"){
      newSortTodos = todos.sort((a,b)=>{
        switch(sortStatus){
          case "limit":
            if (a.limitTime < b.limitTime) return -1
            if (a.limitTime > b.limitTime) return 1
            return 0
          case "title":
            if (a.title < b.title) return -1
            if (a.title > b.title) return 1
            return 0
          case "id":
            if (a.id < b.id) return -1
            if (a.id > b.id) return 1
            return 0
          default:
            return 0
        }
      })
    }else{
      newSortTodos = todos.sort((a,b)=>{
        switch(sortStatus){
          case "limit":
            if (a.limitTime > b.limitTime) return -1
            if (a.limitTime < b.limitTime) return 1
            return 0
          case "title":
            if (a.title > b.title) return -1
            if (a.title < b.title) return 1
            return 0
          case "id":
            if (a.id > b.id) return -1
            if (a.id < b.id) return 1
          default:
            return 0
        }
      })
    }
    let fileterTodos = []
    switch(fileterState){
      case "all":
        fileterTodos = newSortTodos
        break
      case "wait":
        fileterTodos = newSortTodos.filter(todo => todo.status==="未着手")
        break
      case "working":
        fileterTodos = newSortTodos.filter(todo => todo.status==="進行中")
        break
      case "complete":
        fileterTodos = newSortTodos.filter(todo => todo.status==="完了")
        break
      default:
        fileterTodos = newSortTodos
        break
    }
    setDisplayTodos(fileterTodos)
    setChangeTodo(!changeTodo)
  }, [sortStatus, order, fileterState, todos])

  useAuthStatus("todos", false)
  
  return (
    <>
      <Layout title="TODO一覧">
        <HStack>
          <Link href="/todos/create">
            <Button bg="teal.50">
              <AddIcon />
            </Button>
          </Link>
          <Select value={fileterState} onChange={e=>setFileterState(e.target.value)}>
            <option value="all">全て表示</option>
            <option value="wait">未着手</option>
            <option value="working">進行中</option>
            <option value="complete">完了</option>
          </Select>
          <Select value={sortStatus} onChange={e=>setSortStatus(e.target.value)}>
            <option value="id">id</option>
            <option value="title">タイトル</option>
            <option value="limit">期限</option>
          </Select>
          <RadioGroup defaultValue={order}>
            <Stack spacing={5} direction="row">
              <Radio name="upbtn"id="up"colorScheme="red" value="up" onChange={e=>setOrder(e.target.value)}>
                昇順
              </Radio>
              <Radio name="downBtn" id="down" colorScheme="green" value="down"onChange={e=>setOrder(e.target.value)}>
                降順
              </Radio>
            </Stack>
          </RadioGroup>
        </HStack>
        <Stack overflow={"auto"} h="80vh">
          {
            displayTodos && displayTodos.map(todo=>{
              return <Todo key={todo.uid} todo={todo}/>
            })
          }
        </Stack>
      </Layout>
      <Footer />
    </>
  )
}

export default Todos


