import React, { useState } from "react";
import { signUp } from "@aws-amplify/auth";
import { Box, Button, Container, Field, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await signUp({
        username: formData.username,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
          },
        },
      });
      setMessage("Registration successful! Check your email for a verification code.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" mt={10}>
      <Box p={6} boxShadow="md" borderRadius="md">
        <Heading size="lg" mb={4} textAlign="center">
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Field.Root>
              <Field.Label>Username</Field.Label>
              <Input name="username" type="text" onChange={handleChange} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input name="email" type="email" onChange={handleChange} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input name="password" type="password" onChange={handleChange} />
            </Field.Root>

            <Button colorScheme="blue" type="submit" isLoading={loading} width="full">
              Sign Up
            </Button>

            {message && <Text color={message.includes("successful") ? "green.500" : "red.500"}>{message}</Text>}
          </VStack>
        </form>
      </Box>
    </Container>
  );
};
