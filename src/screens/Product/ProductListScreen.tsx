import { Flex, Table, Button, Text, Container } from "@chakra-ui/react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Pagination } from "../../components/chakraCustoms/paginationCustom";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ChakraRouterLink } from "../../components/ui/chakraRouterLink";
import Navbar from "../../components/commons/navbar";
import { useColorModeValue } from "../../components/ui/color-mode";
import Footer from "../../components/commons/footer";

export default function ProductListScreen() {
  const dataProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      imageUrl: "https://source.unsplash.com/400x400/?headphones",
      price: 149.99,
      stock: 25,
    },
    {
      id: 2,
      name: "Smartphone Stand",
      description: "Adjustable stand for smartphones and tablets.",
      imageUrl: "https://source.unsplash.com/400x400/?phone-stand",
      price: 19.99,
      stock: 120,
    },
    {
      id: 2,
      name: "Gaming Mouse",
      description: "Ergonomic gaming mouse with RGB lighting.",
      imageUrl: "https://source.unsplash.com/400x400/?gaming-mouse",
      price: 59.99,
      stock: 60,
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      description: "RGB backlit mechanical keyboard for smooth typing.",
      imageUrl: "https://source.unsplash.com/400x400/?keyboard",
      price: 89.99,
      stock: 40,
    },
    {
      id: 4,
      name: "4K Monitor",
      description: "Ultra HD 27-inch monitor with vibrant colors.",
      imageUrl: "https://source.unsplash.com/400x400/?4k-monitor",
      price: 299.99,
      stock: 15,
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      description: "Portable Bluetooth speaker with deep bass.",
      imageUrl: "https://source.unsplash.com/400x400/?bluetooth-speaker",
      price: 39.99,
      stock: 80,
    },
    {
      id: 6,
      name: "Fitness Tracker",
      description:
        "Track your workouts, steps, and sleep with this smart band.",
      imageUrl: "https://source.unsplash.com/400x400/?fitness-tracker",
      price: 69.99,
      stock: 100,
    },
    {
      id: 7,
      name: "Laptop Sleeve",
      description: "Protective laptop sleeve for 13-15 inch laptops.",
      imageUrl: "https://source.unsplash.com/400x400/?laptop-sleeve",
      price: 24.99,
      stock: 90,
    },
    {
      id: 8,
      name: "Webcam HD",
      description: "Full HD webcam for video calls and streaming.",
      imageUrl: "https://source.unsplash.com/400x400/?webcam",
      price: 49.99,
      stock: 70,
    },
    {
      id: 9,
      name: "USB-C Hub",
      description: "7-in-1 USB-C hub for all your connectivity needs.",
      imageUrl: "https://source.unsplash.com/400x400/?usb-hub",
      price: 34.99,
      stock: 55,
    },
    {
      id: 10,
      name: "Noise Cancelling Earbuds",
      description: "Compact earbuds with active noise cancellation.",
      imageUrl: "https://source.unsplash.com/400x400/?earbuds",
      price: 79.99,
      stock: 65,
    },
    {
      id: 11,
      name: "Portable Charger",
      description: "10,000mAh portable charger with fast charging.",
      imageUrl: "https://source.unsplash.com/400x400/?powerbank",
      price: 29.99,
      stock: 150,
    },
    {
      id: 12,
      name: "Smart Watch",
      description: "Stay connected with calls, messages, and fitness tracking.",
      imageUrl: "https://source.unsplash.com/400x400/?smartwatch",
      price: 199.99,
      stock: 35,
    },
    {
      id: 13,
      name: "Action Camera",
      description: "Capture your adventures in 4K resolution.",
      imageUrl: "https://source.unsplash.com/400x400/?action-camera",
      price: 249.99,
      stock: 22,
    },
    {
      id: 14,
      name: "VR Headset",
      description: "Experience immersive virtual reality gaming.",
      imageUrl: "https://source.unsplash.com/400x400/?vr-headset",
      price: 399.99,
      stock: 10,
    },
    {
      id: 15,
      name: "LED Desk Lamp",
      description: "Adjustable LED desk lamp with touch control.",
      imageUrl: "https://source.unsplash.com/400x400/?desk-lamp",
      price: 14.99,
      stock: 200,
    },
    {
      id: 16,
      name: "Streaming Microphone",
      description: "High-quality microphone for streaming and recording.",
      imageUrl: "https://source.unsplash.com/400x400/?microphone",
      price: 89.99,
      stock: 30,
    },
    {
      id: 17,
      name: "Laptop Cooling Pad",
      description: "Keep your laptop cool during heavy tasks.",
      imageUrl: "https://source.unsplash.com/400x400/?cooling-pad",
      price: 27.99,
      stock: 75,
    },
    {
      id: 18,
      name: "Wireless Charger",
      description: "Fast wireless charging pad compatible with all Qi devices.",
      imageUrl: "https://source.unsplash.com/400x400/?wireless-charger",
      price: 21.99,
      stock: 95,
    },
    {
      id: 20,
      name: "Noise Isolating Headset",
      description: "Perfect for calls and meetings with clear mic and sound.",
      imageUrl: "https://source.unsplash.com/400x400/?call-headset",
      price: 54.99,
      stock: 50,
    },
  ];

  const MotionDiv = motion.div;

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
        <Flex px={"1rem"} mt={"1rem"} mb={""}>
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
                  Action
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {dataProducts.map((product, index) => (
                <Table.Row key={product.id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.imageUrl}</Table.Cell>
                  <Table.Cell>{product.description}</Table.Cell>
                  <Table.Cell>{product.stock}</Table.Cell>
                  <Table.Cell>Rp.{product.price}</Table.Cell>
                  {/* <Table.Cell textAlign={"center"}>
                  {product.warehouseId}
                </Table.Cell>
                <Table.Cell textAlign={"center"}>
                  {product.categoryId}
                </Table.Cell> */}
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
      </Container>
      <Footer />
    </>
  );
}
