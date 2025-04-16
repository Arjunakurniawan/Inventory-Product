import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Text,
  Box,
  Avatar,
  Float,
  Circle,
  IconButton,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Heading,
  useDisclosure,
  Drawer,
  DrawerBackdrop,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { LuMoon, LuSun, LuMenu } from "react-icons/lu";
import iconAvatar from "../../assets/images/sugengIcon.jpg";
import { ChakraRouterLink } from "../ui/chakraRouterLink";

export default function Navbar() {
  const { toggleColorMode, colorMode } = useColorMode();
  const { onOpen, open, onClose } = useDisclosure();

  return (
    <>
      <Box fontFamily="montserrat">
        <Flex
          justifyContent={"space-between"}
          px={"3rem"}
          py={"1rem"}
          display={{ base: "none", md: "flex" }}
          alignItems={"center"}
          fontWeight={"600"}
        >
          <Text pointerEvents={"none"}>Inventory Management</Text>
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
                  <Avatar.Image src={iconAvatar} />
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

        {/* mobile Sidebar */}
        <Flex padding={"1.5rem"} justifyContent={"space-between"}>
          <Drawer.Root open={open} placement="start">
            <Drawer.Trigger asChild>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open"
                onClick={onOpen}
                variant={"outline"}
                size={"sm"}
              >
                <LuMenu />
              </IconButton>
            </Drawer.Trigger>
            <Portal>
              <DrawerBackdrop backdropFilter={"blur(5px)"} />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title color={useColorModeValue("#0118D8", "white")}>
                      Inventory Management
                    </Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Flex
                      flexDirection={"column"}
                      alignItems={"stretch"}
                      fontWeight={"bold"}
                    >
                      <ChakraRouterLink
                        as={RouterLink}
                        to="/"
                        outline={"none"}
                        py={"1rem"}
                        pl={"0.5rem"}
                        textDecoration={"none"}
                        _hover={{
                          bgColor: useColorModeValue(
                            "blackAlpha.100",
                            "whiteAlpha.300"
                          ),
                        }}
                      >
                        Home
                      </ChakraRouterLink>
                      <hr />
                      <ChakraRouterLink
                        as={RouterLink}
                        to="/products"
                        outline={"none"}
                        py={"1rem"}
                        pl={"0.5rem"}
                        textDecoration={"none"}
                        _hover={{
                          bgColor: useColorModeValue(
                            "blackAlpha.100",
                            "whiteAlpha.300"
                          ),
                        }}
                      >
                        Products
                      </ChakraRouterLink>
                      <hr />
                      <ChakraRouterLink
                        as={RouterLink}
                        to="/category"
                        outline={"none"}
                        py={"1rem"}
                        pl={"0.5rem"}
                        textDecoration={"none"}
                        _hover={{
                          bgColor: useColorModeValue(
                            "blackAlpha.100",
                            "whiteAlpha.300"
                          ),
                        }}
                      >
                        Categories
                      </ChakraRouterLink>
                      <hr />
                      <ChakraRouterLink
                        as={RouterLink}
                        to="/warehouse"
                        outline={"none"}
                        py={"1rem"}
                        pl={"0.5rem"}
                        textDecoration={"none"}
                        _hover={{
                          bgColor: useColorModeValue(
                            "blackAlpha.100",
                            "whiteAlpha.300"
                          ),
                        }}
                      >
                        Warehouse
                      </ChakraRouterLink>
                      <hr />
                      <ChakraRouterLink
                        as={RouterLink}
                        to="/transactions"
                        outline={"none"}
                        py={"1rem"}
                        pl={"0.5rem"}
                        textDecoration={"none"}
                        _hover={{
                          bgColor: useColorModeValue(
                            "blackAlpha.100",
                            "whiteAlpha.300"
                          ),
                        }}
                      >
                        Transactions
                      </ChakraRouterLink>
                    </Flex>
                  </Drawer.Body>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton
                      size="sm"
                      onClick={onClose}
                      variant={"outline"}
                      mt={"0.5rem"}
                    />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
          <IconButton
            onClick={toggleColorMode}
            variant="outline"
            display={{ base: "flex", md: "none" }}
            size="sm"
            rounded={"full"}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.200", "gray.700"),
            }}
          >
            {colorMode === "light" ? <LuSun /> : <LuMoon />}
          </IconButton>
        </Flex>
      </Box>
    </>
  );
}
