import {
  Avatar,
  Box,
  Flex,
  Button,
  Text
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { deleteDoc, doc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '../firebase';

const Comment = ({comment, todo, currentUser}) => {
  const router = useRouter()
  const deleteComment = async() => {
    const result = confirm("削除しますか？")
    if(!result) return
    await deleteDoc(doc(db, "todolists", todo.uid, "comments", comment.id))
      .then(()=>{

      }).catch((err)=>{
        alert(err.message)
      })
  }
  return (
    <Box >
      <Flex>
        <Box ml={2}mr={4} mt={1}>
          <Avatar name={comment.username} src={comment.avatarUrl} />
        </Box>
          <Text mr={5}mt={4}>{comment.username}</Text>
        <Text flex={1} mt={4} >{comment.comment}</Text>
        {currentUser.id===comment.userId && (
          <Button onClick={deleteComment} mt={2} mr={3}>
            <DeleteIcon/>
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default Comment
