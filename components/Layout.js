import React from 'react'
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  Container
} from "@chakra-ui/react";
import Head from 'next/head';

const Layout = (props) => {
  const children = props.children
  const title = props.title
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleToggle = () => (isOpen ? onClose() : onOpen())
  let logBtnName = ""
  switch(title){
    case "Signin":
      logBtnName = "Create acount"
      break
    case "Signup":
      logBtnName = "Sign in"
      break
    default: 
      logBtnName  = "Logout"

  }
  return (
    <>
      <Head title={title} />
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            Nextjs-Todo
          </Heading>
        </Flex>
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <Button
            variant="outline"
            _hover={{ bg: "teal.700", borderColor: "teal.700" }}
            onClick={props.changePage}
          >
            {logBtnName}
          </Button>
        </Box>
      </Flex>
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
