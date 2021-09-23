import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from "next/link"

const Footer = () => {
  return (
    <Box
      position={"absolute"}
      bottom={"0"}
      w={"full"}
      bg="teal.500"
      minH={"10vh"}
      color={"white"}>
      
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Stack direction={'row'} spacing={6}>
          <Link href="/mypage">ユーザー</Link>
          <Link href="/todos">TODO</Link>
        </Stack>
        <Text>© 2020 Chakra Templates. All rights reserved</Text>
      </Container>
    </Box>
  )
}

export default Footer
