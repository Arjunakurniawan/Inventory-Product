import {
  Flex,
  Table,
  Button,
  Text,
  Container,
  Box,
  TableScrollArea,
  Pagination,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ChakraRouterLink } from "../../components/ui/chakraRouterLink";
import Navbar from "../../components/commons/navbar";
import { useColorModeValue } from "../../components/ui/color-mode";
import Footer from "../../components/commons/footer";
import { DeleteProduct, FetchProduct } from "../../services/product";
import { useEffect, useState } from "react";
import { Product } from "../../types/typing";
import { LuChevronRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LuChevronLeft } from "react-icons/lu";

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const getApi = async (page = 1) => {
    try {
      const responseGet = await FetchProduct(
        `/product?page=${page}&limit=${limit}`
      );

      setProducts(responseGet?.data || []);
      setTotalItems(responseGet?.total || 0);
    } catch (error) {
      console.error(error, "404 not found");
    }
  };

  useEffect(() => {
    getApi(page);
  }, [page]);

  // rumus calculation pagination manual
  //  const totalPages = Math.ceil(totalItems / limit);

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

  const handleEdit = (productId: number) => {
    navigate(`/product/edit/${productId}`);
  };

  const MotionDiv = motion.div;
  const navigate = useNavigate();

  console.log("page", page);
  console.log("totalItems", totalItems);

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
          gap={5}
        >
          <Text
            fontSize={"lg"}
            textDecoration={"underline solid#939393"}
            pointerEvents={"none"}
          >
            Data Product
          </Text>
          <ChakraRouterLink to={"/product/create"} textDecoration={"none"}>
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
          <Box w={"100%"} display={{ base: "none", md: "none", xl: "flex" }}>
            <Table.Root size="lg">
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
                    <Table.Cell display={"flex"} gap={"1rem"} height={"10rem"}>
                      <Button
                        variant="outline"
                        size="sm"
                        colorPalette={"blue"}
                        onClick={() => handleEdit(product.id)}
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
          </Box>

          {/* mobile Table */}
          <Box
            w={"100%"}
            display={{
              base: "flex",
              md: "flex",
              lg: "flex",
              xl: "none",
            }}
          >
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
                          onClick={() =>
                            navigate(`/product/edit/${product.id}`)
                          }
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
        </Flex>
        <Pagination.Root
          count={totalItems}
          pageSize={limit}
          page={page}
          defaultPage={page}
          marginTop={"1rem"}
          marginLeft={"2rem"}
          onPageChange={(newPage) => setPage(newPage.page)}
        >
          <ButtonGroup variant="outline" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton
                  variant={{ base: "ghost", _selected: "outline" }}
                  onClick={() => setPage(page.value)}
                >
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Container>
      <Footer />
    </>
  );
}
