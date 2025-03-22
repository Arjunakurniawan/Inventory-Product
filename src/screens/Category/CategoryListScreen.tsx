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
import { useEffect, useState } from "react";
import { GetCategory } from "../../services/CategoryService";
import Navbar from "../../components/commons/navbar";
import { Category } from "../../services/CategoryService";
import e from "express";

export default function CategoryListScreen() {
  const MotionDiv = motion.div;

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchAPICategory = async () => {
      const response = await GetCategory<Category[]>("/category");
      setCategories(response);
    };
    fetchAPICategory();
  }, []);

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call your API here
    console.log("Form submitted");
  };

  return (
    <>
      <Navbar />
      <form>
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
          <Dialog.Root>
            <DialogTrigger>
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
                      <Field.Root>
                        <Field.Label>Name Category</Field.Label>
                        <Input placeholder="Category" />
                      </Field.Root>
                    </Stack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={HandleSubmit}>Add</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Flex>
        <Flex px={"1rem"} mt={"0.5rem"} justifyContent={"center"}>
          <Table.Root size="lg" interactive w={"85%"}>
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
        <Flex justifyContent={"center"}>
          <Pagination />
        </Flex>
      </form>
    </>
  );
}
