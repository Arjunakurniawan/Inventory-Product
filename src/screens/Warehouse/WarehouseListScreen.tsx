import {
  Flex,
  Table,
  Button,
  Text,
  Container,
  Dialog,
  DialogTrigger,
  Portal,
  Stack,
  Field,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import Navbar from "../../components/commons/navbar";
import Footer from "../../components/commons/footer";
import { CreateWarehouse, FetchWarehouse } from "../../services/Warehouse";
import { Warehouse } from "../../types/typing";
import { useEffect, useState } from "react";

export default function WarehouseListScreen() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValueAddress, setInputValueAddress] = useState("");
  const [textError, setTextError] = useState("");

  const getWarehouse = async () => {
    try {
      const responseGet = await FetchWarehouse<Warehouse[]>("/warehouse");
      setWarehouses(responseGet);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue === "") {
      setTextError("this field is required");
      console.log("this is error text", textError);
      return;
    }
    try {
      const responseCreateData = await CreateWarehouse<Warehouse>(
        "/warehouse/create",
        {
          name: inputValue,
          phone: inputValue,
          address: inputValue,
        }
      );

      if (responseCreateData) {
        setWarehouses([...warehouses, responseCreateData]);
      }

      setInputValue("");
      setTextError("");
      console.log("success added", responseCreateData);
    } catch (error) {
      console.error(error);
      throw error;
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
          <Dialog.Root open={isOpen}>
            <DialogTrigger>
              <Button
                colorPalette={"cyan"}
                variant={"outline"}
                rounded={"md"}
                _hover={{}}
                onClick={() => setIsOpen(true)}
              >
                <MotionDiv
                  whileHover={{ rotate: 30 }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
                >
                  <FaPlus />
                </MotionDiv>
                Add new Warehouse
              </Button>
            </DialogTrigger>
            <Portal>
              <Dialog.Backdrop backdropFilter={"blur(5px)"} />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Add New Category</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body pb="4">
                    <Stack gap="4">
                      <Field.Root invalid>
                        <Field.Label>Name Warehouse</Field.Label>
                        <Input
                          type="text"
                          placeholder="Add here..."
                          value={inputValue}
                          onChange={(e) => {
                            setInputValue(e.target.value);
                            setTextError("");
                          }}
                          borderColor={textError ? "red.500" : "gray.300"}
                          _focus={{
                            borderColor: textError ? "red.500" : "gray.300",
                            boxShadow: "none",
                          }}
                          rounded="md"
                          outline={"none"}
                        />
                        {textError && (
                          <Field.ErrorText color={"red.500"} fontSize={"sm"}>
                            {textError}
                          </Field.ErrorText>
                        )}
                        <Field.Label>Address</Field.Label>
                        <Textarea
                          placeholder="Add Location..."
                          value={inputValueAddress}
                          onChange={(e) => {
                            setInputValueAddress(e.target.value);
                            setTextError("");
                          }}
                          borderColor={textError ? "red.500" : "gray.300"}
                          _focus={{
                            borderColor: textError ? "red.500" : "gray.300",
                            boxShadow: "none",
                          }}
                          rounded="md"
                          outline={"none"}
                        />
                        {textError && (
                          <Field.ErrorText color={"red.500"} fontSize={"sm"}>
                            {textError}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    </Stack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        type="submit"
                      >
                        Cancel
                      </Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleAdd}>Add</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
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
