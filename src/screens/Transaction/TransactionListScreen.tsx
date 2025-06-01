import {
  Flex,
  Table,
  Button,
  Text,
  Container,
  TableScrollArea,
  Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import Footer from "../../components/commons/footer";
import Navbar from "../../components/commons/navbar";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { TransactionWithItems } from "../../types/typing";
import { useEffect, useState } from "react";
import { getTransactions } from "../../services/Transaction";

export default function TransactionListScreen() {
  const [transactions, setTransactions] = useState<TransactionWithItems[]>([]);
  console.log(transactions);

  const getApi = async () => {
    try {
      const responseGet = await getTransactions(
        "/transactions"
      );
      setTransactions(responseGet || []);
    } catch (error) {
      console.error(error, "404 not found");
    }
  };
  

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <Navbar />
      <Container
        fluid
        bg={useColorModeValue("gray.100", "gray.900")}
        paddingBottom={"5rem"}
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
            marginRight={"1rem"}
          >
            Data Warehouse
          </Text>
        </Flex>
        <Flex px={"1rem"} mt={"1.5rem"}>
          <Box w={"100%"} display={{ base: "none", md: "flex" }}>
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
                {transactions.map((transaction, index) => (
                  <Table.Row key={transaction.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{transaction.items}</Table.Cell>
                    <Table.Cell>{transaction.address}</Table.Cell>
                    <Table.Cell>{transaction.phone}</Table.Cell>
                    <Table.Cell
                      display={"flex"}
                      justifyContent={"center"}
                      gap={"1rem"}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        colorPalette={"blue"}
                        // onClick={() => handleEditClick(warehouse)}
                      >
                        <FaEdit />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        colorPalette={"red"}
                        // onClick={() => handleDelete(warehouse.id)}
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
          <Box w={"100%"} display={{ base: "flex", md: "none" }}>
            <TableScrollArea borderRadius={"sm"} boxShadow={"sm"}>
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
                  {warehouses.map((warehouse, index) => (
                    <Table.Row key={warehouse.id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{warehouse.name}</Table.Cell>
                      <Table.Cell>{warehouse.address}</Table.Cell>
                      <Table.Cell>{warehouse.phone}</Table.Cell>
                      <Table.Cell
                        display={"flex"}
                        justifyContent={"center"}
                        gap={"1rem"}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          colorPalette={"blue"}
                          // onClick={() => handleEditClick(warehouse)}
                        >
                          <FaEdit />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          colorPalette={"red"}
                          // onClick={() => handleDelete(warehouse.id)}
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
      </Container>
      <Footer />
    </>
  );
}
