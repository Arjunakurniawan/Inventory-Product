import {
  Button,
  Field,
  Fieldset, 
  Flex,
  For,
  Input,
  NativeSelect,
  NumberInput,
  Stack,
} from "@chakra-ui/react";

export default function formAddProduct() {
  return (
    <>
      <Fieldset.Root maxW={"165vh"} maxH={"breakpoint-lg"} size={"lg"} margin={"5rem"} outline={"1px solid #fff"} p={"5rem"}>
        <Stack>
          <Fieldset.Legend>Form Add New Product</Fieldset.Legend>
          <Fieldset.HelperText>
            Please fill out this form to add a new product.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Flex justifyContent={"space-between"} gap={"15px"}>
              <Field.Label>Name</Field.Label>
              <Input placeholder="Add name..." />

              <Field.Label>Stock</Field.Label>
              <NumberInput.Root defaultValue="10" width="200px">
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </Flex>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </>
  );
}
