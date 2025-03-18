import React from 'react';
import { Box, Heading, Text, Button, Link, Flex, Container } from '@chakra-ui/react';
import PageActionBar from './components/PageActionBar';
import PixelArt from './PixelArt';

function LandingPage() {
    return (
        <Box position="relative" minHeight="100vh" display="flex" flexDirection="column">
            {/* Pixel Art in the background */}
            <Box position="absolute" top="0" left="0" width="100%" height="100%" zIndex="-1">
                <PixelArt />
            </Box>

            {/* Navbar */}
            <Flex as="nav" justify="space-between" p={5}>
                <Heading size="lg">Demo App</Heading>
            </Flex>

            {/* Main Content (takes remaining space) */}
            <Container maxW="container.lg" centerContent py={20} textAlign="center" flex="1">
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

            {/* Footer (sticks to the bottom) */}
            <Box py={5} textAlign="center">
                &copy; 2024 Ashvin. All rights reserved.
            </Box>

            <PageActionBar pageTitle="Home" />
        </Box>
    );
}

export default LandingPage;
