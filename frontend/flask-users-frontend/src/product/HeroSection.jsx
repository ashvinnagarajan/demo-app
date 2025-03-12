import { Button, Center, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { triggerConfetti, scrollToSection  } from "../utils/animationUtils";
import { FaArrowDown } from "react-icons/fa";

export const HeroSection = () => {
    return (
        <Container maxW="container.lg">
            <Center p={6} minHeight="80vh">
            <VStack spacing={6} textAlign="center">
                <Heading size="2xl" fontWeight="bold" color="gray.800" maxW="container.md">
                You don’t have to chase your clients around to get paid
                </Heading>

                <Text fontSize="xl" color="gray.600" maxW="container.md">
                Freelancers use <strong>Biller</strong> to accept payments and send invoices with a single click.
                </Text>

                <Button
                mt={4}
                size="lg"
                colorScheme="brand"
                px={8}
                py={6}
                fontSize="lg"
                bg="green.400"
                onClick={triggerConfetti}
                >
                Get Paid Faster – Try for $10/month →
                </Button>

                <Text fontSize="sm" color="gray.500">
                🚀 102+ builders have signed up in the last 30 days
                </Text>
            </VStack>
            
            {/* Floating Arrow Button */}
            <motion.div
                animate={{ y: [0, 10, 0] }} // Smooth bounce animation
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                style={{
                position: "absolute",
                bottom: "20px",
                transform: "translateX(-50%)",
                zIndex: 2,
                }}
            >
                <Button
                size="md"
                colorScheme="green"
                bg="green.600"
                p={4}
                borderRadius="full"
                boxShadow="lg"
                _hover={{ bg: "green.700", transform: "scale(1.1)" }}
                onClick={() => scrollToSection("faq-section")}
                >
                <FaArrowDown size="20px" color="white" />
                </Button>
            </motion.div>
            </Center>

        </Container>
    );
};
