import {
  Box,
  Button,
  ClipboardRoot,
  Flex,
  HStack,
  Separator,
  Text,
} from "@chakra-ui/react";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { PasswordInput } from "./ui/password-input";
import { ClipboardIconButton } from "./ui/clipboard";
import { useState } from "react";

const lowercaseChars: string = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars: string = "0123456789";
const specialChars: string = '!"#$%&()*+,-./:;<=>?@[]^_`{|}~';

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([30]);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialChars, setUseSpecialChars] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if no checkbox is ticked, abort
    if (!useLowercase && !useUppercase && !useNumbers && !useSpecialChars) {
      alert("At least one password generation type must be selected.");
      return;
    }

    const possibleChars: string =
      "" +
      (useLowercase ? lowercaseChars : "") +
      (useUppercase ? uppercaseChars : "") +
      (useNumbers ? numberChars : "") +
      (useSpecialChars ? specialChars : "");

    let generatedPassword: string = "";

    for (let i = 0; i < length[0]; i++) {
      generatedPassword +=
        possibleChars[Math.floor(Math.random() * possibleChars.length)];
    }
    setPassword(generatedPassword);
  };

  return (
    <Box width={500} p={6} borderWidth={1} borderRadius={10}>
      <form onSubmit={handleSubmit}>
        <Flex justify="space-between" align="end">
          <Text textStyle="sm" fontWeight="semibold">
            Password Length
          </Text>
          <Text>{length}</Text>
        </Flex>
        <Slider
          value={length}
          onValueChange={(e) => setLength(e.value)}
          defaultValue={[25]}
          max={40}
          mb={2}
        />
        <Flex gapX={8} wrap="wrap">
          <Checkbox
            checked={useLowercase}
            onCheckedChange={(e) => setUseLowercase(!!e.checked)}
            size="sm"
          >
            a-z
          </Checkbox>
          <Checkbox
            checked={useUppercase}
            onCheckedChange={(e) => setUseUppercase(!!e.checked)}
            size="sm"
          >
            A-Z
          </Checkbox>
          <Checkbox
            checked={useNumbers}
            onCheckedChange={(e) => setUseNumbers(!!e.checked)}
            size="sm"
          >
            0-9
          </Checkbox>
          <Checkbox
            checked={useSpecialChars}
            onCheckedChange={(e) => setUseSpecialChars(!!e.checked)}
            size="sm"
          >
            !@#
          </Checkbox>
        </Flex>

        <Separator my={4} />
        <HStack>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            defaultVisible
          />
          <Button type="submit">Generate</Button>
          <ClipboardRoot value={password} timeout={1000}>
            <ClipboardIconButton />
          </ClipboardRoot>
        </HStack>
      </form>
    </Box>
  );
};

export default PasswordGenerator;
