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
  TableScrollArea,
  Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import Navbar from "../../components/commons/navbar";
import Footer from "../../components/commons/footer";
import {
  CreateWarehouse,
  DeleteWarehouse,
  FetchWarehouse,
  UpdateWarehouse,
} from "../../services/Warehouse";
import { Warehouse } from "../../types/typing";
import React, { useEffect, useState } from "react";

export default function WarehouseListScreen() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValueAddress, setInputValueAddress] = useState("");
  const [inputValuePhone, setInputValuePhone] = useState("");
  const [textError, setTextError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null
  );

  const getApi = async () => {
    try {
      const responseGet = await FetchWarehouse<Warehouse[]>("/warehouse");
      setWarehouses(responseGet);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      inputValue === "" ||
      inputValueAddress === "" ||
      inputValuePhone === ""
    ) {
      setTextError("this field is required");
      console.log("this is error text", textError);
      return;
    }
    try {
      const responseCreateData = await CreateWarehouse<Warehouse>(
        "/warehouse/create",
        {
          name: inputValue,
          address: inputValueAddress,
          phone: inputValuePhone,
        }
      );

      if (responseCreateData) {
        setWarehouses([...warehouses, responseCreateData]);
      }

      setInputValue("");
      setInputValueAddress("");
      setInputValuePhone("");
      setTextError("");
      getApi();
      setIsOpen(false);
      console.log("success added", responseCreateData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    const responseDelete = await DeleteWarehouse<Warehouse>(`/warehouse/${id}`);
    if (responseDelete) {
      setWarehouses(warehouses.filter((warehouse) => warehouse.id === id));
    }
    getApi();
    console.log("success Deleted");
  };

  const handleEditClick = async (warehouse: Warehouse) => {
    console.log(selectedWarehouse);
    setSelectedWarehouse(warehouse);
    setIsEdit(true);

    setInputValue(warehouse.name);
    setInputValueAddress(warehouse.address);
    setInputValuePhone(warehouse.phone);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const responseEdit = await UpdateWarehouse<Warehouse>(
        `/warehouse/update/${selectedWarehouse?.id}`,
        { name: inputValue, address: inputValueAddress, phone: inputValuePhone }
      );

      if (responseEdit) {
        setWarehouses([...warehouses, responseEdit]);
      }

      getApi();
      setIsEdit(false);
    } catch (error) {
      alert("failed edited");
      console.error(error, "failed edit");
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const MotionDiv = motion.div;

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
                        <Field.Label>Phone</Field.Label>
                        <Input
                          type="text"
                          placeholder="Add Phone..."
                          value={inputValuePhone}
                          onChange={(e) => {
                            setInputValuePhone(e.target.value);
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

          <Dialog.Root open={isEdit}>
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
                        <Field.Label>Phone</Field.Label>
                        <Input
                          type="text"
                          placeholder="Add Phone..."
                          value={inputValuePhone}
                          onChange={(e) => {
                            setInputValuePhone(e.target.value);
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
                        onClick={() => {
                          setIsEdit(false);
                          setInputValue("");
                          setInputValueAddress("");
                          setInputValuePhone("");
                        }}
                      >
                        Cancel
                      </Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleEdit}>Edit</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
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
                        onClick={() => handleEditClick(warehouse)}
                      >
                        <FaEdit />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        colorPalette={"red"}
                        onClick={() => handleDelete(warehouse.id)}
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
                          onClick={() => handleEditClick(warehouse)}
                        >
                          <FaEdit />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          colorPalette={"red"}
                          onClick={() => handleDelete(warehouse.id)}
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
