import {
  Box,
  Button,
  Container,
  Field,
  Fieldset,
  Grid,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import Navbar from "../../components/commons/navbar";
import { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { ChakraRouterLink } from "../../components/ui/chakraRouterLink";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Category, ProductRequest, Warehouse } from "../../types/typing";
import { CreateProduct } from "../../services/product";
import { FetchWarehouse } from "../../services/Warehouse";
import { FetchCategory } from "../../services/Category";
import Footer from "../../components/commons/footer";

export default function ProductCreateScreen() {
  //get data Warehouse and Category
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getWarehouses = async () => {
    try {
      const response = await FetchWarehouse<Warehouse[]>("/warehouse");
      setWarehouses(response);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await FetchCategory<Category[]>("/category");
      setCategories(response);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  useEffect(() => {
    getWarehouses();
    getCategory();
  }, []);

  const [inputValue, setInputValue] = useState<ProductRequest>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    categoryId: 0,
    warehouseId: 0,
  });

  const navigate = useNavigate();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !inputValue.name ||
      !inputValue.description ||
      !inputValue.price ||
      !inputValue.stock ||
      !inputValue.image ||
      !inputValue.categoryId ||
      !inputValue.warehouseId
    ) {
      alert("field is required");
      return;
    }

    try {
      const responseCreate = await CreateProduct<ProductRequest>(
        "/product/create",
        {
          name: inputValue.name,
          description: inputValue.description,
          price: inputValue.price,
          stock: inputValue.stock,
          image: inputValue.image,
          categoryId: inputValue.categoryId,
          warehouseId: inputValue.warehouseId,
        }
      );

      if (responseCreate) {
        navigate("/products");
        alert("success created");
      }
    } catch (error) {
      console.error(error);
      alert("There something wrong");
    }
  };

  return (
    <>
      <Navbar />
      <Container
        bg={useColorModeValue("gray.100", "gray.900")}
        fluid
        padding={"1rem"}
      >
        <Fieldset.Root
          maxW={{ base: "100%", lg: "165vh" }}
          maxH={"breakpoint-lg"}
          size={"lg"}
          margin={{ base: "0", lg: "3rem auto", "2xl": "4rem" }}
          alignItems={"center"}
          p={"2rem"}
          border={"1.5px solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          borderStyle={"dashed"}
          bg={useColorModeValue("white", "black")}
        >
          <Stack marginBottom={"1rem"}>
            <Fieldset.Legend fontWeight={"bold"} textAlign={"center"}>
              Form Add New Product
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Please fill out this form to add a new product.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root>
              <Grid
                templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                gap={"8"}
                margin={"1rem auto"}
              >
                <Box>
                  <SimpleGrid columns={1} minChildWidth={"100%"} rowGap={4}>
                    <Field.Label fontWeight={"bold"} alignSelf={"start"}>
                      Name
                    </Field.Label>
                    <Input
                      outline={"none"}
                      placeholder="Add name..."
                      value={inputValue.name}
                      alignSelf={"start"}
                      onChange={(e) =>
                        setInputValue({ ...inputValue, name: e.target.value })
                      }
                    />

                    <Field.Label fontWeight={"bold"} alignSelf={"start"}>
                      description
                    </Field.Label>
                    <Textarea
                      outline={"none"}
                      placeholder="Add name..."
                      value={inputValue.description}
                      alignSelf={"start"}
                      onChange={(e) =>
                        setInputValue({
                          ...inputValue,
                          description: e.target.value,
                        })
                      }
                    />

                    <SimpleGrid alignSelf={"center"} columns={2} gap={4} mt={4}>
                      <Field.Label fontWeight={"bold"}>warehouseId</Field.Label>
                      <Field.Label fontWeight={"bold"}>categoryId</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          outline={"none"}
                          name="warehouse"
                          placeholder="Select Warehouse"
                          onChange={(e) => {
                            setInputValue({
                              ...inputValue,
                              warehouseId: Number(e.target.value),
                            });
                          }}
                        >
                          {warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                              {warehouse.name}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          outline={"none"}
                          placeholder="Select Category"
                          onChange={(e) => {
                            setInputValue({
                              ...inputValue,
                              categoryId: Number(e.target.value),
                            });
                          }}
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </SimpleGrid>

                    <Field.Label fontWeight={"bold"} alignSelf={"start"}>
                      Stock
                    </Field.Label>
                    <Input
                      outline={"none"}
                      value={inputValue.stock}
                      onChange={(e) =>
                        setInputValue({
                          ...inputValue,
                          stock:
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value),
                        })
                      }
                    />
                  </SimpleGrid>
                </Box>

                <Box>
                  <SimpleGrid columns={1}>
                    <Field.Label fontWeight={"bold"} alignSelf={"start"} mb={4}>
                      Price
                    </Field.Label>
                    <InputGroup startElement="Rp" alignSelf={"start"} mb={4}>
                      <Input
                        value={inputValue.price}
                        outline={"none"}
                        onChange={(e) =>
                          setInputValue({
                            ...inputValue,
                            price:
                              e.target.value === ""
                                ? 0
                                : parseInt(e.target.value),
                          })
                        }
                      />
                    </InputGroup>

                    <Field.Label fontWeight={"bold"} mb={4}>
                      Upload Image
                    </Field.Label>
                    <InputGroup position={"relative"} textAlign={"center"}>
                      <Box
                        cursor={"pointer"}
                        border={"1.5px solid"}
                        borderColor={useColorModeValue("gray.200", "gray.700")}
                        borderStyle={"dashed"}
                        width={"100%"}
                        paddingY={"5.7rem"}
                      >
                        <Icon size="md" color="fg.muted">
                          <LuUpload />
                        </Icon>
                        <Text color={"fg.muted"}>Drag and drop files here</Text>
                        <Text color={"fg.muted"}>.png, .jpg up to 5MB</Text>
                        <Input
                          cursor={"pointer"}
                          type="file"
                          position={"absolute"}
                          opacity={"0"}
                          top={"0"}
                          left={"0"}
                          w={"full"}
                          h={"full"}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setInputValue({
                                ...inputValue,
                                image: file.name,
                              });
                              console.log("fileName:", file);
                            }
                          }}
                        />
                      </Box>
                    </InputGroup>
                  </SimpleGrid>
                </Box>

                <SimpleGrid columns={{ base: 4, lg: 5 }} columnGap={3}>
                  <ChakraRouterLink
                    as={RouterLink}
                    to={"/products"}
                    textDecoration={"none"}
                  >
                    <Button variant={"surface"}>Cancel</Button>
                  </ChakraRouterLink>
                  <Button variant={"outline"} onClick={handleAdd}>
                    Add
                  </Button>
                </SimpleGrid>
              </Grid>
            </Field.Root>
          </Fieldset.Content>
        </Fieldset.Root>
      </Container>
      <Footer />
    </>
  );
}
