import {
  Box,
  Button,
  ClipboardRoot,
  Flex,
  HStack,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { PasswordInput } from "./ui/password-input";
import { ClipboardIconButton } from "./ui/clipboard";

const PasswordGenerator = () => {
  return (
    <Box width={600} p={4} borderWidth={1} borderRadius={10}>
      <Flex justify="space-between">
        <Text>Password Length</Text>
        <Text>25</Text>
      </Flex>
      <Slider defaultValue={[25]} max={40} mb={1} />
      <Flex gapX={10} wrap="wrap">
        <Checkbox>a-z</Checkbox>
        <Checkbox>A-Z</Checkbox>
        <Checkbox>!@#</Checkbox>
        <Checkbox>0-9</Checkbox>
      </Flex>
      <Stack>
        <Separator my={4} />
        <Button>Generate</Button>
        <HStack>
          <PasswordInput />
          <ClipboardRoot value="test" timeout={1000}>
            <ClipboardIconButton />
          </ClipboardRoot>
        </HStack>
      </Stack>
    </Box>
  );
};

export default PasswordGenerator;
