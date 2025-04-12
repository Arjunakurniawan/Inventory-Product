import { Flex, Table, Button, Text, Container } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ChakraRouterLink } from "../../components/ui/chakraRouterLink";
import Navbar from "../../components/commons/navbar";
import Footer from "../../components/commons/footer";
import { FetchWarehouse } from "../../services/WarehouseService";
import { Warehouse } from "../../services/types/typing";
import { useEffect, useState } from "react";

export default function WarehouseListScreen() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const getWarehouse = async () => {
    try {
      const responseGet = await FetchWarehouse<Warehouse[]>("/warehouse");
      setWarehouses(responseGet);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWarehouse();
  }, []);

  const MotionDiv = motion.div;

  return (
    <>
      <Navbar />
      <Container
        fluid
        bg={useColorModeValue("gray.100", "gray.900")}
        mt={"-3rem"}
        paddingBottom={"10rem"}
      >
        <Flex
          justifyContent={"space-between"}
          alignContent={"center"}
          pt={"2rem"}
          mx={"2rem"}
        >
          <Text
            fontSize={"lg"}
            textDecoration={"underline solid#939393"}
            pointerEvents={"none"}
          >
            Data Warehouse
          </Text>
          <ChakraRouterLink to={"/FormAddProduct"} textDecoration={"none"}>
            <Button
              colorPalette={"cyan"}
              variant={"outline"}
              rounded={"md"}
              _hover={{}}
            >
              <MotionDiv
                whileHover={{ rotate: 30 }}
                transition={{ duration: 0.2, ease: "easeIn" }}
              >
                <FaPlus />
              </MotionDiv>
              Add new Warehouse
            </Button>
          </ChakraRouterLink>
        </Flex>
        <Flex px={"1rem"} mt={"1.5rem"}>
          <Table.Root size="lg" interactive>
            <Table.Header pointerEvents={"none"}>
              <Table.Row>
                <Table.ColumnHeader>no</Table.ColumnHeader>
                <Table.ColumnHeader>name</Table.ColumnHeader>
                <Table.ColumnHeader>address</Table.ColumnHeader>
                <Table.ColumnHeader>phone</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>
                  Action
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {warehouses.map((product, index) => (
                <Table.Row key={product.id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.address}</Table.Cell>
                  <Table.Cell>{product.phone}</Table.Cell>
                  <Table.Cell
                    display={"flex"}
                    justifyContent={"center"}
                    gap={"1rem"}
                  >
                    <Button variant="outline" size="sm" colorPalette={"blue"}>
                      <FaEdit />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" colorPalette={"red"}>
                      <FaRegTrashAlt />
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
