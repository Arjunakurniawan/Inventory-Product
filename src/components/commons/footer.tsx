import {
  Container,
  Flex,
  IconButton,
  Link,
  Span,
  Text,
} from "@chakra-ui/react";
import { ChakraRouterLink } from "../ui/chakraRouterLink";
import { Link as RouterLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { useColorModeValue } from "../ui/color-mode";
export default function Footer() {
  return (
    <>
      <Container fluid display={{ base: "none", md: "block" }}>
        <Flex
          justifyContent={"space-between"}
          flexDirection={"row"}
          pt={"3rem"}
          pb={"3rem"}
        >
          <Text>
            Inventory<Text fontWeight={"bold"}>Management</Text>
          </Text>
          <Flex gap={"3rem"}>
            <ChakraRouterLink as={RouterLink} to="/" outline={"none"}>
              Home
            </ChakraRouterLink>
            <ChakraRouterLink
              as={RouterLink}
              to="/products"
              outline={"none"}
              _hover={{ bgColor: "whiteAlpha.100" }}
            >
              Products
            </ChakraRouterLink>
            <ChakraRouterLink as={RouterLink} to="/category" outline={"none"}>
              Categories
            </ChakraRouterLink>
            <ChakraRouterLink as={RouterLink} to="/warehouse" outline={"none"}>
              Warehouse
            </ChakraRouterLink>
            <ChakraRouterLink
              as={RouterLink}
              to="/transactions"
              outline={"none"}
            >
              Transactions
            </ChakraRouterLink>
          </Flex>
          <Flex>
            <IconButton
              bg={useColorModeValue("white", "black")}
              color={useColorModeValue("black", "white")}
            >
              <FaGithub />
            </IconButton>
            <IconButton
              bg={useColorModeValue("white", "black")}
              color={useColorModeValue("black", "white")}
            >
              <FaInstagram />
            </IconButton>
            <IconButton
              bg={useColorModeValue("white", "black")}
              color={useColorModeValue("black", "white")}
            >
              <FaLinkedin />
            </IconButton>
          </Flex>
        </Flex>
        <hr />
        <Flex
          justifyContent={"center"}
          flexDirection={"row"}
          marginTop={"2rem"}
          pb={"2rem"}
        >
          <Text color={"whiteAlpha."}>
            © 2025 Arjuna, Inc. All rights reserved.
          </Text>
        </Flex>
      </Container>

      {/* mobile Footer */}
      <Container fluid display={{ base: "block", md: "none" }}>
        <Flex flexDirection={"column"} justifySelf={"center"} pt={"1rem"}>
          <Text>
            Inventory
            <Span fontWeight={"bold"} marginLeft={"0.2rem"}>
              Management
            </Span>
          </Text>
          <Flex marginLeft={"2rem"} marginTop={"1rem"}>
            <IconButton
              bg={useColorModeValue("white", "black")}
              color={useColorModeValue("black", "white")}
            >
              <FaGithub />
            </IconButton>
            <IconButton
              bg={useColorModeValue("white", "black")}
              color={useColorModeValue("black", "white")}
            >
              <FaInstagram />
            </IconButton>
            <IconButton
              bg={useColorModeValue("white", "black")}
              color={useColorModeValue("black", "white")}
            >
              <FaLinkedin />
            </IconButton>
          </Flex>
        </Flex>
        <hr />
        <Flex marginTop={"2rem"} pb={"2rem"} justifyContent={"center"}>
          <Text color={"whiteAlpha."}>
            © 2025 Arjuna, Inc. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </>
  );
}
