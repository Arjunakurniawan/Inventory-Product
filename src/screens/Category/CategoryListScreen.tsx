import {
  Flex,
  Table,
  Button,
  Text,
  Dialog,
  DialogTrigger,
  Portal,
  Stack,
  Field,
  Input,
  Container,
} from "@chakra-ui/react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  CreateCategory,
  DeleteCategory,
  FetchCategory,
  UpdateCategory,
} from "../../services/Category";
import { Category } from "../../types/typing";
import { useColorModeValue } from "../../components/ui/color-mode";
import Navbar from "../../components/commons/navbar";
import Footer from "../../components/commons/footer";

export default function CategoryListScreen() {
  const MotionDiv = motion.div;

  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textError, setTextError] = useState("");
  const [seledtedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const getCategory = async () => {
    try {
      const responseGet = await FetchCategory<Category[]>(`/category`);
      setCategories(responseGet);
    } catch (error) {
      console.log("Error getting", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      setTextError("This field is required");
      console.log("errorText", textError);
      return;
    }

    try {
      const responseNewData = await CreateCategory<Category>(
        "/category/create",
        {
          name: inputValue,
        }
      );

      if (responseNewData) {
        setCategories([...categories, responseNewData]);
      }

      setInputValue("");
      setTextError("");
      getCategory();
      setIsOpen(false);
      console.log("berhasil di tambahkan", inputValue);
      console.log(inputValue);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    const responseDelete = await DeleteCategory<Category>(`/category/${id}`);
    if (responseDelete) {
      setCategories(categories.filter((category) => category.id === id));
    }
    getCategory();
    console.log("berhasil di hapus");
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsEdit(true);
    setInputValue(category.name);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const responseEdit = await UpdateCategory<Category>(
        `/category/update/${seledtedCategory?.id}`,
        { name: inputValue }
      );
      if (responseEdit) {
        setCategories([...categories, responseEdit]);
      }
      getCategory();
      setIsEdit(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <Navbar />
      <Container
        fluid
        bg={useColorModeValue("gray.100", "gray.900")}
        mt={"-3rem"}
        paddingBottom={"9rem"}
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
            Data Category
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
                Add new Category
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
                        <Field.Label>Name Category</Field.Label>
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
                    <Dialog.Title>Edit Category</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body pb="4">
                    <Stack gap="4">
                      <Field.Root invalid>
                        <Field.Label>Name Category</Field.Label>
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
        <Flex px={"1rem"} mt={"1.5rem"} justifyContent={"center"}>
          <Table.Root size="lg" interactive>
            <Table.Header pointerEvents={"none"}>
              <Table.Row>
                <Table.ColumnHeader textAlign={"center"}>no</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>
                  name
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign={"center"}>
                  Action
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {categories.map((category, index) => (
                <Table.Row>
                  <Table.Cell textAlign={"center"} key={category.id}>
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell textAlign={"center"}>{category.name}</Table.Cell>
                  <Table.Cell
                    display={"flex"}
                    gap={"1rem"}
                    justifyContent={"center"}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      colorPalette={"blue"}
                      onClick={() => handleEditClick(category)}
                    >
                      <FaEdit />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      colorPalette={"red"}
                      onClick={() => handleDelete(category.id)}
                    >
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
