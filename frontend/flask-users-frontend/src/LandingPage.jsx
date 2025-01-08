import React from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Link, Flex, Container } from '@chakra-ui/react';

function LandingPage() {
    return (
        <Box>
            {/* Navbar */}
            <Flex as="nav" justify="space-between" p={5}>
                <Heading size="lg">Demo App</Heading>
                <Link href="/users" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                    Manage Users
                </Link>
            </Flex>

            {/* Hero Section */}
            <Container maxW="container.lg" centerContent py={20} textAlign="center">
                <Heading as="h1" size="2xl" mb={4}>
                    Effortlessly Manage Your Users
                </Heading>
                <Text fontSize="lg" mb={6}>
                    A powerful and simple user management app built with React and Flask.
                </Text>
                <Link href="/users">
                    <Button size="lg">
                        Get Started
                    </Button>
                </Link>
            </Container>

            {/* Features Section */}
            <Box py={20} >
                <Container maxW="container.lg">
                    <Heading as="h2" size="xl" textAlign="center" mb={10}>
                        Why Choose Our App?
                    </Heading>
                    <HStack spacing={10} justify="center">
                        {/* Feature 1 */}
                        <VStack
                            p={5}
                            borderWidth="1px"
                            borderRadius="md"
                            boxShadow="md"
                            maxW="sm"
                        >
                            <Heading size="md">Easy to Use</Heading>
                            <Text textAlign="center">
                                Simple UI to manage users quickly and efficiently.
                            </Text>
                        </VStack>

                        {/* Feature 2 */}
                        <VStack
                            p={5}
                            borderWidth="1px"
                            borderRadius="md"
                            boxShadow="md"
                            maxW="sm"
                        >
                            <Heading size="md">Secure</Heading>
                            <Text textAlign="center">
                                Built with security best practices using Flask and React.
                            </Text>
                        </VStack>

                        {/* Feature 3 */}
                        <VStack
                            p={5}
                            borderWidth="1px"
                            borderRadius="md"
                            boxShadow="md"
                            maxW="sm"
                        >
                            <Heading size="md">Scalable</Heading>
                            <Text textAlign="center">
                                Designed for scalability with a cloud-native architecture.
                            </Text>
                        </VStack>
                    </HStack>
                </Container>
            </Box>

            {/* Footer Section */}
            <Box py={5} textAlign="center">
                &copy; 2024 Flask User Management App. All rights reserved.
            </Box>
        </Box>
    );
}

export default LandingPage;