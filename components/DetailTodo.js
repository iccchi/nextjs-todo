import Image from 'next/image';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Link from 'next/link';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  HStack,
  Button
} from '@chakra-ui/react';
import { userContext } from '../store/userContext';
import { useContext } from 'react';
import { doc, deleteDoc } from '@firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/router';

const timestampToTime = (timestamp) => {
  const date = new Date(timestamp);
  const yyyy = `${date.getFullYear()}`;
  // .slice(-2)で文字列中の末尾の2文字を取得する
  // `0${date.getHoge()}`.slice(-2) と書くことで０埋めをする
  const MM = `0${date.getMonth() + 1}`.slice(-2); // getMonth()の返り値は0が基点
  const dd = `0${date.getDate()}`.slice(-2);

  return `${yyyy}/${MM}/${dd}`;
}

export default function DetailTodo({todo}) {
  const {currentUser} = useContext(userContext)
  const router = useRouter()
  const DeleteTodo = async() => {
    const result = confirm("削除しますか？")
    if(!result) return
    await deleteDoc(doc(db, "todolists", todo.uid))
      .then(()=>{
        router.push("/todos")
      }).catch((err)=>{
        alert(err.message)
      })
  }

  return (
    <Center py={6}>
      <Box
        maxW={'800px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Stack>
          <HStack justifyContent="space-between">
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              {todo.status}
            </Text>
            {currentUser.id===todo.userId && (
              <HStack>
                <Link href={`/todos/${todo.uid}/edit`}>
                  <Button>
                    <EditIcon />
                  </Button>
                </Link>
                <Button onClick={DeleteTodo}>
                  <DeleteIcon />
                </Button>
              </HStack>
            )} 
            </HStack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {todo.title}
          </Heading>
          <Text
            color={'red.400'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            期限：{todo.limitTime}
          </Text>
        </Stack>
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
      </Box>
    </Center>
  );
}