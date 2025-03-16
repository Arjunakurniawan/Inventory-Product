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
import { Pagination } from "../ui/paginationCustom";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { GetCategory } from "../../services/CategoryService";

export default function TableCategory() {
  const MotionDiv = motion.div;
  const dataCategory = [
    {
      id: 1,
      name: "Electronics",
    },
    {
      id: 2,
      name: "Furniture",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetCategory();
        console.log("data berhasil di ambil", data);
      } catch (error) {
        console.error("Error ambil data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
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
                  <Button>Add</Button>
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
              <Table.ColumnHeader textAlign={"center"}>name</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>
                Action
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataCategory.map((product, index) => (
              <Table.Row key={product.id}>
                <Table.Cell textAlign={"center"}>{index + 1}</Table.Cell>
                <Table.Cell textAlign={"center"}>{product.name}</Table.Cell>

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
    </>
  );
}
