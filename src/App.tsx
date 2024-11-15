import { Flex } from "@chakra-ui/react";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <PasswordGenerator />
    </Flex>
  );
}

export default App;
