import {
  Flex,
  Table,
  Button,
  Text,
  Container,
  Box,
  TableScrollArea,
} from "@chakra-ui/react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
// import { Pagination } from "../../components/chakraCustoms/paginationCustom";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ChakraRouterLink } from "../../components/ui/chakraRouterLink";
import Navbar from "../../components/commons/navbar";
import { useColorModeValue } from "../../components/ui/color-mode";
import Footer from "../../components/commons/footer";
import { DeleteProduct, FetchProduct } from "../../services/product";
import { useEffect, useState } from "react";
import { Product } from "../../types/typing";

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);

  const getApi = async () => {
    try {
      const responseGet = await FetchProduct<Product[]>("/product");
      setProducts(responseGet || []);
    } catch (error) {
      console.error(error, "404 not found");
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const responseDelete = await DeleteProduct(`/product/${id}`);

      if (responseDelete) {
        setProducts(products.filter((product) => product.id === id));
      }

      getApi();
      alert("succes Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const MotionDiv = motion.div;

  return (
    <>
      <Navbar />
      <Container
        fluid
        bg={useColorModeValue("gray.100", "gray.900")}
        paddingBottom={"3rem"}
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
            Data Product
          </Text>
          <ChakraRouterLink to={"/products/create"} textDecoration={"none"}>
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
              Add new Product
            </Button>
          </ChakraRouterLink>
        </Flex>
        <Flex px={"1rem"} mt={"1rem"}>
          <Box w={"100%"} display={{ base: "none", md: "flex" }}>
            <TableScrollArea borderRadius={"sm"} boxShadow={"sm"}>
              <Table.Root size="lg" interactive>
                <Table.Header pointerEvents={"none"}>
                  <Table.Row>
                    <Table.ColumnHeader>no</Table.ColumnHeader>
                    <Table.ColumnHeader>name</Table.ColumnHeader>
                    <Table.ColumnHeader>description</Table.ColumnHeader>
                    <Table.ColumnHeader>image</Table.ColumnHeader>
                    <Table.ColumnHeader>stock</Table.ColumnHeader>
                    <Table.ColumnHeader>price</Table.ColumnHeader>
                    <Table.ColumnHeader>categoryId</Table.ColumnHeader>
                    <Table.ColumnHeader>warehouseId</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign={"center"}>
                      Action
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {products.map((product, index) => (
                    <Table.Row key={product.id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{product.name}</Table.Cell>
                      <Table.Cell>{product.description}</Table.Cell>
                      <Table.Cell>{product.image}</Table.Cell>
                      <Table.Cell>{product.stock}</Table.Cell>
                      <Table.Cell>Rp.{product.price}</Table.Cell>
                      <Table.Cell textAlign={"center"}>
                        {product.warehouseId}
                      </Table.Cell>
                      <Table.Cell textAlign={"center"}>
                        {product.categoryId}
                      </Table.Cell>
                      <Table.Cell
                        display={"flex"}
                        gap={"1rem"}
                        height={"10rem"}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          colorPalette={"blue"}
                        >
                          <FaEdit />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          colorPalette={"red"}
                          onClick={() => handleDelete(product.id)}
                        >
                          <FaRegTrashAlt />
                          Delete
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </TableScrollArea>
          </Box>

          {/* mobile Table */}
          <Box w={"100%"} display={{ base: "flex", md: "none" }}>
            <TableScrollArea borderRadius={"sm"} boxShadow={"sm"}>
              <Table.Root size="lg" interactive>
                <Table.Header pointerEvents={"none"}>
                  <Table.Row>
                    <Table.ColumnHeader>no</Table.ColumnHeader>
                    <Table.ColumnHeader>name</Table.ColumnHeader>
                    <Table.ColumnHeader>description</Table.ColumnHeader>
                    <Table.ColumnHeader>image</Table.ColumnHeader>
                    <Table.ColumnHeader>stock</Table.ColumnHeader>
                    <Table.ColumnHeader>price</Table.ColumnHeader>
                    <Table.ColumnHeader>warehouseId</Table.ColumnHeader>
                    <Table.ColumnHeader>categoryId</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign={"center"}>
                      Action
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {products.map((product, index) => (
                    <Table.Row key={product.id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{product.name}</Table.Cell>
                      <Table.Cell>{product.description}</Table.Cell>
                      <Table.Cell>{product.image}</Table.Cell>
                      <Table.Cell>{product.stock}</Table.Cell>
                      <Table.Cell>Rp.{product.price}</Table.Cell>
                      <Table.Cell textAlign={"center"}>
                        {product.warehouseId}
                      </Table.Cell>
                      <Table.Cell textAlign={"center"}>
                        {product.categoryId}
                      </Table.Cell>
                      <Table.Cell
                        display={"flex"}
                        justifyContent={"end"}
                        gap={"1rem"}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          colorPalette={"blue"}
                        >
                          <FaEdit />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          colorPalette={"red"}
                          onChange={() => handleDelete(product.id)}
                        >
                          <FaRegTrashAlt />
                          Delete
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </TableScrollArea>
          </Box>
        </Flex>
        {/* <Pagination /> */}
      </Container>
      <Footer />
    </>
  );
}
