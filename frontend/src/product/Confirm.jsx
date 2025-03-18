import { useState } from "react";
import { Auth } from "aws-amplify";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";

const ConfirmSignUp = () => {
  const [formData, setFormData] = useState({ username: "", code: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await Auth.confirmSignUp(formData.username, formData.code);
      setMessage("Account confirmed! You can now log in.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" mt={10}>
      <Box p={6} boxShadow="md" borderRadius="md" bg="white">
        <Heading size="lg" mb={4} textAlign="center">
          Confirm Account
        </Heading>
        <form onSubmit={handleConfirm}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input name="username" type="text" onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Verification Code</FormLabel>
              <Input name="code" type="text" onChange={handleChange} />
            </FormControl>

            <Button colorScheme="green" type="submit" isLoading={loading} width="full">
              Confirm
            </Button>

            {message && <Text color={message.includes("confirmed") ? "green.500" : "red.500"}>{message}</Text>}
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default ConfirmSignUp;
