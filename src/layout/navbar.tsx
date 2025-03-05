import {
  Flex,
  Text,
  Box,
  Link,
  Avatar,
  Float,
  Circle,
  IconButton,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Heading,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";

export default function Navbar() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <>
      <Box fontFamily="montserrat">
        <Flex
          justifyContent={"space-between"}
          px={"3rem"}
          py={"1rem"}
          alignItems={"center"}
          fontWeight={"600"}
          bg={useColorModeValue("gray.100", "gray.900")}
        >
          <Text>Inventory Management</Text>
          <Flex gap={"3rem"} bg={useColorModeValue("gray.100", "gray.900")}>
            <Link href="#">Home</Link>
            <Link href="#">Products</Link>
            <Link href="#">Categories</Link>
            <Link href="#">Warehouse</Link>
            <Link href="#">Transactions</Link>
          </Flex>
          <Flex gap={"2rem"} alignItems={"center"}>
            <IconButton
              onClick={toggleColorMode}
              variant="outline"
              size="sm"
              rounded={"full"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
            >
              {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
            <MenuRoot>
              <MenuTrigger>
                <Avatar.Root outline={"black"} size={"xl"} cursor={"pointer"}>
                  <Avatar.Fallback name="Sugeng Tumbler" />
                  <Avatar.Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYsHPGUxI0LerPvdxWjKvHESdJmla2hlKRYg&s" />
                  <Float placement="bottom-end" offsetX="1" offsetY="1">
                    <Circle
                      bg="green.500"
                      size="8px"
                      outline="0.1em solid"
                      outlineColor="bg"
                    />
                  </Float>
                </Avatar.Root>
              </MenuTrigger>
              <MenuContent
                bg={useColorModeValue("white", "gray.800")}
                position={"absolute"}
                marginLeft={"-4rem"}
                marginTop={"16rem"}
                w={"14rem"}
                fontWeight={"normal"}
                padding={"0.5rem"}
              >
                <Heading size={"sm"} marginBottom={"0.5rem"} pl={"0.5rem"}>
                  Sugeng Tumbler
                </Heading>
                <Text
                  fontSize={"xs"}
                  marginBottom={"1rem"}
                  pl={"0.5rem"}
                  opacity={"40%"}
                >
                  SugengTumbler@example.com
                </Text>
                <hr />
                <MenuItem value="profile" cursor={"pointer"} mt={"0.5rem"}>
                  My profile
                </MenuItem>
                <MenuItem value="settings" cursor={"pointer"} mb={"0.5rem"}>
                  Account Settings
                </MenuItem>
                <hr />
                <MenuItem value="logout" cursor={"pointer"}>
                  Logout
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
