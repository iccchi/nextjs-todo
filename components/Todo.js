import React,{useContext} from 'react'
import Link from 'next/link'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  HStack,
  Button,
} from "@chakra-ui/react"
import { userContext } from '../store/userContext'

const timestampToTime = (timestamp) => {
  const date = new Date(timestamp);
  const yyyy = `${date.getFullYear()}`;
  // .slice(-2)で文字列中の末尾の2文字を取得する
  // `0${date.getHoge()}`.slice(-2) と書くことで０埋めをする
  const MM = `0${date.getMonth() + 1}`.slice(-2); // getMonth()の返り値は0が基点
  const dd = `0${date.getDate()}`.slice(-2);

  return `${yyyy}/${MM}/${dd}`;
}

const Todo = ({todo}) => {
  const {currentUser} = useContext(userContext)
  return (
    <Link href={`/todos/${todo.uid}`}>
      <Center py={6} _hover={{opacity: 0.6, cursor: "pointer"}}>
      <Box
        maxW={'600px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Stack>
          <HStack justifyContent="space-between">
            <Text
              color={'teal.400'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              {todo.id+1}
            </Text>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              {todo.status}
            </Text>
          </HStack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {todo.title}
          </Heading>
        </Stack>
        <HStack justifyContent="space-between">
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Avatar
              src={todo.avatarUrl}
              alt={'Author'}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>{todo.username}</Text>
              <Text color={'gray.500'}>{`作成日：${timestampToTime(todo.createdAt)}`}</Text>
            </Stack>
          </Stack>
          <Text
            pt={"10"}
            color={'red.400'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            期限：{todo.limitTime}
          </Text>
        </HStack>
      </Box>
      </Center>
    </Link>
  )
}

export default Todo
