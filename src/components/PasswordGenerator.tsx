import {
  Box,
  ClipboardRoot,
  Flex,
  HStack,
  IconButton,
  Separator,
  Text,
} from "@chakra-ui/react";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { PasswordInput } from "./ui/password-input";
import { ClipboardIconButton } from "./ui/clipboard";
import { useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { NumberInputField, NumberInputRoot } from "./ui/number-input";
import { Toaster, toaster } from "./ui/toaster";

const lowercaseChars: string = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars: string = "0123456789";
const specialChars: string = '!"#$%&()*+,-./:;<=>?@[]^_`{|}~';

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(30);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialChars, setUseSpecialChars] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if no checkbox is ticked, abort
    if (!useLowercase && !useUppercase && !useNumbers && !useSpecialChars) {
      toaster.create({
        description: "At least one password generation type must be selected.",
        type: "error",
      });
      return;
    }

    // if length is 0, abort
    if (length < 1) {
      toaster.create({
        description: "Password length can't be 0.",
        type: "error",
      });
      return;
    }

    const possibleChars: string =
      "" +
      (useLowercase ? lowercaseChars : "") +
      (useUppercase ? uppercaseChars : "") +
      (useNumbers ? numberChars : "") +
      (useSpecialChars ? specialChars : "");

    let generatedPassword: string = "";

    for (let i = 0; i < length; i++) {
      generatedPassword +=
        possibleChars[Math.floor(Math.random() * possibleChars.length)];
    }
    setPassword(generatedPassword);
  };

  const showClipboardMessage = () => {
    toaster.create(
      password.length > 0
        ? {
            description: "Copied to clipboard.",
            type: "success",
          }
        : {
            description: "Password field is empty.",
            type: "error",
          }
    );
  };

  return (
    <>
      <Box width={500} p={6} borderWidth={1} borderRadius={10} bg="bg.subtle">
        <form onSubmit={handleSubmit}>
          <Flex justify="space-between" align="center">
            <Text textStyle="sm" fontWeight="semibold">
              Password Length
            </Text>
            <NumberInputRoot
              value={String(length)}
              onValueChange={(e) => setLength(Number(e.value))}
              min={0}
              max={64}
              inputMode="numeric"
              size="xs"
              width={20}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Flex>

          <Slider
            value={[length]}
            onValueChange={(e) => setLength(e.value[0])}
            defaultValue={[25]}
            max={64}
            my={2}
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
            <IconButton type="submit">
              <LuRefreshCcw />
            </IconButton>
            <ClipboardRoot
              value={password}
              timeout={1000}
              onStatusChange={showClipboardMessage}
            >
              <ClipboardIconButton size="md" />
            </ClipboardRoot>
          </HStack>
        </form>
      </Box>
      <Toaster />
    </>
  );
};

export default PasswordGenerator;
