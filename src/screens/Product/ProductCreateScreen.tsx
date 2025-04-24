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

export default function ProductCreateScreen() {
  const [inputValueName, setInputValueName] = useState("");
  const [valueStock, setValueStock] = useState("10");

  return (
    <>
      <Navbar />
      <Fieldset.Root
        maxW={{ base: "40rem", lg: "165vh" }}
        maxH={"breakpoint-lg"}
        size={"lg"}
        margin={{ base: "4rem", lg: "4rem" }}
        alignItems={"center"}
        p={"5rem"}
        border={"1.5px solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderStyle={"dashed"}
      >
        <Stack marginTop={"-3rem"} marginBottom={"1rem"}>
          <Fieldset.Legend fontWeight={"bold"} textAlign={"center"}>
            Form Add New Product
          </Fieldset.Legend>
          <Fieldset.HelperText>
            Please fill out this form to add a new product.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={"8"}>
              <SimpleGrid columns={1}>
                <Field.Label fontWeight={"bold"} alignSelf={"start"}>
                  Name
                </Field.Label>
                <Input
                  placeholder="Add name..."
                  value={inputValueName}
                  alignSelf={"start"}
                  onChange={(e) => setInputValueName(e.target.value)}
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
                <NumberInput.Root
                  border={"1px solid"}
                  alignSelf={"start"}
                  value={valueStock}
                  onValueChange={(e) => setValueStock(e.value)}
                >
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
              </SimpleGrid>

              <SimpleGrid columns={4} rowGap={4}>
                <Field.Label fontWeight={"bold"}>Price</Field.Label>
                <Input
                  placeholder="Rp.xxxx"
                  value={inputValueName}
                  onChange={(e) => setInputValueName(e.target.value)}
                  gridColumn={"span 4"}
                />

                <Field.Label fontWeight={"bold"} gridColumn={"span 3"}>
                  Upload Image
                </Field.Label>
                <FileUpload.Root
                  maxW="xl"
                  alignItems="stretch"
                  maxFiles={10}
                  gridColumn={"span 4"}
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

              <SimpleGrid columns={7} columnGap={3}>
                <Button variant={"surface"}>Cancel</Button>
                <Button variant={"outline"}>Add</Button>
              </SimpleGrid>
            </Grid>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </>
  );
}
