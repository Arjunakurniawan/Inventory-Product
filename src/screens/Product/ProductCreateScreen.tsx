import {
  Box,
  Button,
  Field,
  Fieldset,
  FileUpload,
  For,
  Grid,
  Icon,
  Input,
  NativeSelect,
  NumberInput,
  SimpleGrid,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import Navbar from "../../components/commons/navbar";
import { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { ChakraRouterLink } from "../../components/ui/chakraRouterLink";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ProductRequest, Warehouse } from "../../types/typing";
import { CreateProduct } from "../../services/product";
import { FetchWarehouse } from "../../services/Warehouse";

export default function ProductCreateScreen() {
  //get data warehouse
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const getWarehouses = async () => {
    try {
      const response = await FetchWarehouse<Warehouse[]>("/warehouse");
      setWarehouses(response);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  const [inputValue, setInputValue] = useState<ProductRequest>({
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 10,
    categoryId: 0,
    warehouseId: 0,
  });

  const navigate = useNavigate();

  const handleAdd = async (e: React.FocusEvent) => {
    e.preventDefault();

    try {
      const responseCreate = await CreateProduct<ProductRequest>(
        "/products/create",
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Fieldset.Root
        maxW={{ base: "100%", lg: "165vh" }}
        maxH={"breakpoint-lg"}
        size={"lg"}
        margin={{ base: "1rem", lg: "3rem auto", "2xl": "4rem" }}
        alignItems={"center"}
        p={"2rem"}
        border={"1.5px solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderStyle={"dashed"}
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
              <SimpleGrid columns={1} minChildWidth={"sm"}>
                <Field.Label fontWeight={"bold"} alignSelf={"start"}>
                  Name
                </Field.Label>
                <Input
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
                <SimpleGrid columns={2}>
                  <Field.Label fontWeight={"bold"}>warehouseId</Field.Label>
                  <Field.Label fontWeight={"bold"}>categoryId</Field.Label>
                </SimpleGrid>

                <SimpleGrid alignSelf={"center"} columns={2} gap={4}>
                  <NativeSelect.Root>
                    <NativeSelect.Field name="warehouse">
                      <option value="">select warehouse</option>
                      {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                  <NativeSelect.Root>
                    <NativeSelect.Field name="country">
                      <For each={["1", "2", "3"]}>
                        {(item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )}
                      </For>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </SimpleGrid>
                <Field.Label fontWeight={"bold"} alignSelf={"start"}>
                  Stock
                </Field.Label>
                <NumberInput.Root border={"1px solid"} alignSelf={"start"}>
                  <NumberInput.Control />
                  <NumberInput.Input
                    value={inputValue.stock}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        stock: parseInt(e.target.value),
                      })
                    }
                  />
                </NumberInput.Root>
              </SimpleGrid>

              <SimpleGrid columns={3} rowGap={4}>
                <Field.Label fontWeight={"bold"}>Price</Field.Label>
                <Input
                  placeholder="Rp.xxxx"
                  value={inputValue.price}
                  onChange={(e) =>
                    setInputValue({
                      ...inputValue,
                      price:
                        e.target.value === "" ? 0 : parseInt(e.target.value),
                    })
                  }
                  gridColumn={"span 3"}
                  width={"100%"}
                />

                <Field.Label fontWeight={"bold"} gridColumn={"span 3"}>
                  Upload Image
                </Field.Label>
                <FileUpload.Root
                  maxW="xl"
                  alignItems="stretch"
                  maxFiles={15}
                  gridColumn={"span 3"}
                >
                  <FileUpload.HiddenInput />
                  <FileUpload.Dropzone>
                    <Icon size="md" color="fg.muted">
                      <LuUpload />
                    </Icon>
                    <FileUpload.DropzoneContent>
                      <Box>Drag and drop files here</Box>
                      <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                    </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>
                  <FileUpload.List />
                </FileUpload.Root>
              </SimpleGrid>

              <SimpleGrid columns={4} columnGap={3}>
                <ChakraRouterLink as={RouterLink} to={"/products"}>
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
    </>
  );
}
