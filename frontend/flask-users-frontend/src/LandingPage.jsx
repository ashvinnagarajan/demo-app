import React from 'react';
import { Box, Heading, Text, Button, Link, Flex, Container } from '@chakra-ui/react';
import PageActionBar from './components/PageActionBar'

function LandingPage() {
    return (
        <Box>
            {/* Navbar */}
            <Flex as="nav" justify="space-between" p={5}>
                <Heading size="lg">Demo App</Heading>
            </Flex>

            <Container maxW="container.lg" centerContent py={20} textAlign="center">
                <Heading as="h1" size="2xl" mb={4}>
                    Welcome to my demo app.
                </Heading>
                <Text fontSize="lg" mb={6}>
                    This is a simple demo app I made for a couple of different use cases.
                </Text>
                <Link href="/users">
                    <Button size="lg">
                        Get Started
                    </Button>
                </Link>
            </Container>

            {/* Footer Section */}
            <Box py={5} textAlign="center">
                &copy; 2024 Ashvin. All rights reserved.
            </Box>
            <PageActionBar pageTitle="Home"/>
        </Box>
    );
}

export default LandingPage;