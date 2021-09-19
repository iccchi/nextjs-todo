import React, { useState, useContext } from 'react'
import { Stack, Avatar, Input,AvatarBadge, AvatarGroup, Center, Heading, Text, Button, Link, Badge, useColorModeValue,Box } from "@chakra-ui/react"
import { async } from '@firebase/util'
import { updateProfile } from '@firebase/auth'
import { auth, storage} from '../firebase'
import { userContext } from '../store/userContext'
import { getDownloadURL, uploadBytes, deleteObject, ref } from '@firebase/storage'


const Profile = ({username, createdAt, lastLoginAt, avatarUrl}) => {
  const [editUserName, setEditUserName] = useState(username)
  const [isEdit, setIsEdit] = useState(false)
  const {currentUser, setCurrentUser } = useContext(userContext)
  const [avatarImage, setAvatarImage] = useState(null)

  const onChangeImageHandler = (e) => {
    if(e.target.files[0]){
      setAvatarImage(e.target.files[0])
    }
  }

  const updateUserProfile = async() => {
    let url = currentUser.avatarUrl

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
      displayName: editUserName,
      photoURL: url
    }).then(()=>{
      setIsEdit(!isEdit)
      setCurrentUser({
        ...currentUser,
        username: auth.currentUser.displayName,
        avatarUrl: auth.currentUser.photoURL
      })
    }).catch((err)=>{
      alert(err.message)
    })
    
  }
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={avatarUrl}          
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        {isEdit && <input type="file" onChange={onChangeImageHandler}/>}
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {isEdit ? <Input value={editUserName} onChange={(e)=>setEditUserName(e.target.value)}/> : username}
        </Heading>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}>
        </Text>

        <Stack align={'center'} justify={'center'} direction={'column'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            作成日: {createdAt}
          </Badge>

          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            最終ログイン: {lastLoginAt}
          </Badge>
        </Stack>
        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            onClick={isEdit ? updateUserProfile : ()=>setIsEdit(!isEdit)}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            {isEdit ? "更新" : "ユーザ情報の編集"}
          </Button>
          {isEdit && (
            <Button
              onClick={()=>setIsEdit(!isEdit)}
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}>
              キャンセル
            </Button>
          )}
        </Stack>
      </Box>
    </Center>
  )
}

export default Profile
