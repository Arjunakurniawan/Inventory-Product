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
} from "@chakra-ui/react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Pagination } from "../../components/ui/paginationCustom";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  CreateCategory,
  DeleteCategory,
  FetchCategory,
} from "../../services/CategoryService";
import Navbar from "../../components/commons/navbar";
import { Category } from "../../services/CategoryService";

export default function CategoryListScreen() {
  const MotionDiv = motion.div;

  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const GetAPICategory = async () => {
    try {
      const responseGet = await FetchCategory<Category[]>("/category");
      setCategories(responseGet);
    } catch (error) {
      console.log("Error getting", error);
    }
  };

  useEffect(() => {
    GetAPICategory();
  }, []);

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      setError("This field is required");
      console.log("errorText", error);
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
      setError("");
      GetAPICategory();
      setIsOpen(false);
      console.log("berhasil di tambahkan", responseNewData);
      console.log(inputValue);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDelete = async (id: number) => {
    const responseDelete = await DeleteCategory(`/category/${id}`);
    if (responseDelete) {
      setCategories(categories.filter((category) => category.id === id));
    }
    console.error(responseDelete);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={HandleSubmit}>
        <Flex
          justifyContent={"space-between"}
          alignContent={"center"}
          pt={"2rem"}
          mx={"6rem"}
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
                            setError("");
                          }}
                          borderColor={error ? "red.500" : "gray.300"}
                          _focus={{
                            borderColor: error ? "red.500" : "gray.300",
                            boxShadow: "none",
                          }}
                          rounded="md"
                          outline={"none"}
                        />
                        {error && (
                          <Field.ErrorText color={"red.500"} fontSize={"sm"}>
                            {error}
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
                    <Button onClick={HandleSubmit}>Add</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Flex>
      </form>
      <Flex px={"1rem"} mt={"0.5rem"} justifyContent={"center"}>
        <Table.Root size="lg" interactive w={"85%"}>
          <Table.Header pointerEvents={"none"}>
            <Table.Row>
              <Table.ColumnHeader textAlign={"center"}>no</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>name</Table.ColumnHeader>
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
                  <Button variant="outline" size="sm" colorPalette={"blue"}>
                    <FaEdit />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    colorPalette={"red"}
                    onClick={() => HandleDelete(category.id)}
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
      <Flex justifyContent={"center"}>
        <Pagination />
      </Flex>
    </>
  );
}
