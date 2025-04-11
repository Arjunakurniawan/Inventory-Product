import { Flex, Table, Button, Text, Input } from "@chakra-ui/react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Pagination } from "../../components/chakraCustoms/paginationCustom";
import { InputGroup } from "../../components/ui/input-group";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Navbar from "../../components/commons/navbar";

export default function HomeScreen() {
  const items = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 999.99,
      Warehouse: 1,
      transaction: 1,
    },
    {
      id: 2,
      name: "Coffee Maker",
      category: "Home Appliances",
      price: 49.99,
      Warehouse: 2,
      transaction: 2,
    },
    {
      id: 3,
      name: "Desk Chair",
      category: "Furniture",
      price: 150.0,
      Warehouse: 3,
      transaction: 3,
    },
    {
      id: 4,
      name: "Smartphone",
      category: "Electronics",
      price: 799.99,
      Warehouse: 4,
      transaction: 4,
    },
    {
      id: 5,
      name: "Headphones",
      category: "Accessories",
      price: 199.99,
      Warehouse: 5,
      transaction: 5,
    },
  ];

  return (
    <>
      <Navbar />
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
          All Data
        </Text>
        <InputGroup startElement={<FaMagnifyingGlass />}>
          <Input type="text" placeholder="Search..." outline={"none"} />
        </InputGroup>
      </Flex>
      <Flex px={"1rem"} mt={"0.5rem"}>
        <Table.Root size="lg" interactive>
          <Table.Header pointerEvents={"none"}>
            <Table.Row>
              <Table.ColumnHeader>Product</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>
                Warehouse
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>
                Transaction
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"end"}>Action</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>Rp.{item.price}</Table.Cell>
                <Table.Cell textAlign={"center"}>{item.Warehouse}</Table.Cell>
                <Table.Cell textAlign={"center"}>{item.transaction}</Table.Cell>
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
