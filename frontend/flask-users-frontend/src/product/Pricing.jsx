import React from "react";
import { Box, Button, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";

const pricingPlans = [
  {
    title: "Basic",
    price: "$10/month",
    features: [
      "5GB Cloud Storage",
      "Basic Support",
      "Single User Access",
    ],
  },
  {
    title: "Pro",
    price: "$25/month",
    features: [
      "100GB Cloud Storage",
      "Priority Support",
      "Multi-User Access",
      "Advanced Analytics",
    ],
    highlight: true, // Highlight this plan
  },
  {
    title: "Enterprise",
    price: "Custom Pricing",
    features: [
      "Unlimited Cloud Storage",
      "24/7 Dedicated Support",
      "Role-based Access",
      "Custom Integrations",
      "Compliance & Security",
    ],
  },
];

export const Pricing = () => {
  return (
    <Box textAlign="center" py={12}>
      <Heading as="h2" size="xl" mb={8} color="gray.900">
        Pricing Plans
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} px={6}>
        {pricingPlans.map((plan, index) => (
          <Box
            key={index}
            borderWidth="2px"
            borderRadius="xl"
            p={8}
            bg="white"
            boxShadow={plan.highlight ? "2xl" : "lg"}
            transform={plan.highlight ? "scale(1.05)" : "none"}
            transition="all 0.3s ease-in-out"
            color="gray.800"
            borderColor={plan.highlight ? "green.500" : "gray.200"}
          >
            <Heading as="h3" size="lg" mb={4} color="gray.900">
              {plan.title}
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              {plan.price}
            </Text>
            <VStack spacing={3} align="stretch" color="gray.600" mt={4}>
              {plan.features.map((feature, idx) => (
                <Text key={idx}>✅ {feature}</Text>
              ))}
            </VStack>
            <Button
              mt={6}
              width="full"
              variant={plan.highlight ? "solid" : "surface"}
              colorPalette={plan.highlight ? "green" : "black"}
            >
              Choose {plan.title}
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
