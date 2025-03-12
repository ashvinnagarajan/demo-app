import { Box, Button, Container, Flex, Heading, HStack, Link, Spacer } from "@chakra-ui/react";
import { triggerConfetti } from "../utils/animationUtils";

export const Header = () => {
  return (
    <Box as="header" bg="white" boxShadow="sm" py={4} position="sticky" top={0} zIndex={2}>
      <Container maxW="container.lg">
        <Flex align="center">
            {/* Logo */}
            <Heading size="md" color="black">
            Biller
            </Heading>

            <Spacer />

            {/* Navigation Links */}
            <Flex flex="1" justify="center">
            <HStack spacing={16} justify="space-between" flex="1" maxW="600px" display={{ base: "none", md: "flex" }}>
                <Link href="#features" color="gray.600" fontWeight="medium" _hover={{ color: "green.500" }}>
                Features
                </Link>
                <Link href="#pricing" color="gray.600" fontWeight="medium" _hover={{ color: "green.500" }}>
                Pricing
                </Link>
                <Link href="#testimonials" color="gray.600" fontWeight="medium" _hover={{ color: "green.500" }}>
                Testimonials
                </Link>
            </HStack>
            </Flex>

            <Spacer />

            {/* CTA Button */}
            <Button colorScheme="blue" size="md" onClick={triggerConfetti}>
            Sign Up
            </Button>
        </Flex>
      </Container>
    </Box>
  );
};
