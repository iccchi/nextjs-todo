import React, { useState, useContext} from 'react'
import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Radio, RadioGroup
} from '@chakra-ui/react';
import { db } from '../../firebase';
import { collection, addDoc } from '@firebase/firestore';
import { userContext } from '../../store/userContext';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { useRouter } from 'next/router';

function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}

const  CreatePage = () => {
  const date = formatDate(new Date())
  const [title, setTitle] = useState("")
  const [limit, setLimit] = useState(date)
  const [progress, setProgress] = useState("未着手")
  const {currentUser} = useContext(userContext)
  const router = useRouter()
  console.log(limit)
  console.log(currentUser)
  //ロジックとビュー分ける。関心で分離する
  const createTask = async() => {
    try{
      const createtime = new Date()
      const docRef = await addDoc(collection(db, "todolists"), {
        createdAt: createtime.getTime(),
        userId: currentUser.id,
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl,
        title: title,
        status: progress,
        limitTime: limit
      })
      console.log("Document written with ID: ", docRef.id);
      setTitle("")
      setProgress("未着手")
      setLimit(date)
      router.push("/todos")
      alert("作成しました！")
    }catch(e){
      alert(e.message)
    }
  }
  useAuthStatus("todos/create")
  return (
    <>
      <Layout>
        <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                TODO作成
              </Heading>
              <FormControl id="title" isRequired>
                <FormLabel>タイトル</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={e=>setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="date" isRequired>
                <FormLabel>期限</FormLabel>
                <Input 
                  type="date" 
                  value={limit}
                  onChange={e=>setLimit(e.target.value)}
                />
              </FormControl>
              <RadioGroup onChange={setProgress} value={progress}>
                <Stack direction="row">
                  <Radio id="1" name="wait" value="未着手">未着手</Radio>
                  <Radio id="2" name="working" value="進行中">進行中</Radio>
                  <Radio id="3" name="complete" value="完了">完了</Radio>
                </Stack>
              </RadioGroup>
              <Stack spacing={6}>
              <Button
                disabled={(!title) || (title.length >50)}
                onClick={createTask}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                作成
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Layout>
      <Footer />
    </>
  )
}

export default CreatePage
