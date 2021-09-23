import Image from 'next/image';
import { EditIcon, DeleteIcon, CheckIcon } from '@chakra-ui/icons'
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
  Button,
  Input,
  Radio, RadioGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { userContext } from '../store/userContext';
import { useContext, useEffect, useState } from 'react';
import { async } from '@firebase/util';
import { doc, updateDoc } from '@firebase/firestore';
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

function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}


export default function EditTodo({todo}) {
  const date = formatDate(new Date())
  // const {currentUser} = useContext(userContext)
  const [editTitle, setEditTitle] = useState("")
  const [limit, setLimit] = useState(date)
  const [progress, setProgress] = useState("未着手")
  const router = useRouter()

  const updateTodo = async() => {
    const todoRef = doc(db, "todolists", todo.uid)
    await updateDoc(todoRef ,{
      title: editTitle,
      status: progress,
      limitTime: limit
    }).then(()=>{
      setEditTitle("")
      setLimit(date)
      setProgress("未着手")
      alert("保存しました！")
      router.push(`/todos/${todo.uid}`)
    }).catch((err)=>{
      alert(err.message)
    })
  }

  useEffect(()=>{
    setEditTitle(todo.title)
    setLimit(todo.limitTime)
    setProgress(todo.status)
  }, [todo])
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Stack>
          <Text
            color={'blue.400'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            タイトル
          </Text>
          <Input value={editTitle} onChange={e=>setEditTitle(e.target.value)}/>
          <Text
            color={'red.400'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            期限
          </Text>
          <Input type="date" value={limit} onChange={e=>setLimit(e.target.value)}/>
          <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              進捗状態
            </Text>
          <RadioGroup onChange={setProgress} value={progress}>
                <Stack direction="row">
                  <Radio id="1" name="wait" value="未着手">未着手</Radio>
                  <Radio id="2" name="working" value="進行中">進行中</Radio>
                  <Radio id="3" name="complete" value="完了">完了</Radio>
                </Stack>
          </RadioGroup>
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
        <Center>
          <Button disabled={(!editTitle) || (editTitle.length >50)} mt={6} bg={"teal.100"} onClick={updateTodo} >
            <CheckIcon/>
          </Button>
        </Center>
      </Box>
    </Center>
  );
}