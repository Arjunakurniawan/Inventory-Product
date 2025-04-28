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
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import Navbar from "../../components/commons/navbar";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { ChakraRouterLink } from "../../components/ui/chakraRouterLink";
import { Link as RouterLink } from "react-router-dom";
import { ProductCreate } from "../../types/typing";

export default function ProductCreateScreen() {
  const [inputValue, setInputValue] = useState<ProductCreate>({
    name: "",
    description: "",
    image: "",
    price: 0,
    stock: 10,
    categoryId: 0,
    warehouseId: 0,
  });

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
                <Field.Label fontWeight={"bold"}>warehouseId</Field.Label>
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
                <Field.Label fontWeight={"bold"}>categoryId</Field.Label>
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
                <Button variant={"outline"}>Add</Button>
              </SimpleGrid>
            </Grid>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </>
  );
}
