import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

const PasswordGenerator = () => {
  return (
    <Box width={600} p={4} borderWidth={1} borderRadius={10}>
      <Heading>Password Generator</Heading>
      <HStack>
        <Text>Password Length</Text>
        <Text>25</Text>
      </HStack>
      <Slider defaultValue={[20]} max={30} />
      <Flex gap={2} direction="column">
        <Switch colorPalette="blue">Lowercase</Switch>
        <Switch>Uppercase</Switch>
        <Switch>Numbers</Switch>
        <Switch>Special Characters</Switch>
      </Flex>
      <Stack>
        <Separator my={4} />
        <Button>Generate</Button>
        <HStack>
          <Input />
          <Button>Hide</Button>
          <Button>Copy</Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default PasswordGenerator;
