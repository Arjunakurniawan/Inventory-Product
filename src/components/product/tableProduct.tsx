import { Flex, Table, Button, Text } from "@chakra-ui/react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Pagination } from "../ui/paginationCustom";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ChakraRouterLink } from "../ui/chakraRouterLink";

export default function tableProduct() {
  const dataProduct = [
    {
      id: 1,
      name: "Laptop",
      image: "laptop.jpg",
      stock: 100,
      price: 999.99,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      warehouseId: 1,
      categoryId: 1,
    },
    {
      id: 2,
      name: "bed",
      image: "bed.jpg",
      stock: 100,
      price: 59.99,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      warehouseId: 1,
      categoryId: 2,
    },
    {
      id: 3,
      name: "chair",
      image: "chair.jpg",
      stock: 50,
      price: 79.99,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      warehouseId: 1,
      categoryId: 2,
    },
  ];

  const MotionDiv = motion.div;

  return (
    <>
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
            Add new Category
          </Button>
        </ChakraRouterLink>
      </Flex>
      <Flex px={"1rem"} mt={"0.5rem"}>
        <Table.Root size="lg" interactive>
          <Table.Header pointerEvents={"none"}>
            <Table.Row>
              <Table.ColumnHeader>no</Table.ColumnHeader>
              <Table.ColumnHeader>name</Table.ColumnHeader>
              <Table.ColumnHeader>image</Table.ColumnHeader>
              <Table.ColumnHeader>description</Table.ColumnHeader>
              <Table.ColumnHeader>stock</Table.ColumnHeader>
              <Table.ColumnHeader>price</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>
                WarehouseId
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>
                CategoryId
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>
                Action
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataProduct.map((product, index) => (
              <Table.Row key={product.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.image}</Table.Cell>
                <Table.Cell>{product.description}</Table.Cell>
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
      <Pagination />
    </>
  );
}
