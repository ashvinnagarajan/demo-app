import {
  Box,
  Container,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
// import { Layout } from "./components/Layout";
// import { PricingSection } from "./components/PricingSection";

function ProductPage() {
  return (
    <Container maxW="full" p={0}>
      
      {/* Trusted By Section */}
      <Container maxW="container.lg" centerContent py={20}>
        <Text color="gray.600" fontSize="xl" fontWeight="bold" textAlign="center">
          Trusted by teams worldwide
        </Text>
        <Flex wrap="wrap" justify="center" align="center" gap={10} mt={8}>
          {["microsoft-logo.svg", "adobe-logo.svg"].map((logo, i) => (
            <Box key={i} p={4}>
              <Image src={logo} alt={logo.replace("-logo.svg", "")} height={10} opacity={0.8} />
            </Box>
          ))}
        </Flex>
      </Container>
      
      {/* Pricing Section */}
      <Container py={28} maxW="container.lg" id="pricing">
        {/* <PricingSection /> */}
      </Container>
  </Container>
  );
};

export default ProductPage