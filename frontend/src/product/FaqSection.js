import { Accordion, Box, Container, Heading, Text, VStack, HStack, Grid, GridItem, Span } from "@chakra-ui/react";

const faqs = [
  {
    value: "a",
    q: "How many cards can I issue?",
    a: "You can issue up to 3 cards with our Free plan. Upgrade to Pro for additional cards and features.",
  },
  {
    value: "b",
    q: "Can I link my credit card to financial tools?",
    a: "Yes! We support integrations with Mint, YNAB, and QuickBooks for seamless financial tracking.",
  },
  {
    value: "c",
    q: "Do you support international transactions?",
    a: "Yes - transactions can be made from and to any country with no additional fees.",
  },
  {
    value: "d",
    q: "Who can I contact for support?",
    a: "Reach out to our support team at support@yourcreditco.com.",
  },
];

const highlights = [
  {
    icon: "✨",
    title: "No Hidden Fees",
    description:
      "Our cards come with zero hidden fees. What you see is what you get—no surprises!",
  },
  {
    icon: "🎉",
    title: "Build Credit Fast",
    description:
      "Using our credit card responsibly helps you build your credit score quickly and effectively.",
  },
  {
    icon: "😃",
    title: "Flexible Rewards Program",
    description:
      "Earn points on every purchase and redeem them for cashback, travel, or shopping vouchers.",
  },
  {
    icon: "🔌",
    title: "Instant Card Issuance",
    description:
      "Get your virtual card instantly and start making purchases online right away!",
  },
];

export const FaqSection = () => {
  return (
    <Box py={20} bg="green.50">
      <Container maxW="container.lg">
        
        {/* Highlights Section */}
        <Heading as="h2" size="lg" textAlign="center" mb={10} color="gray.900">
          Why Choose Us?
        </Heading>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} mb={16}>
          {highlights.map((highlight, index) => (
            <GridItem
              key={index}
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="md"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <HStack spacing={4}>
                <Text fontSize="2xl">{highlight.icon}</Text>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize="lg" color="gray.800">
                    {highlight.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">{highlight.description}</Text>
                </VStack>
              </HStack>
            </GridItem>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Heading as="h2" size="xl" textAlign="center" mb={8} color="gray.900">
          Frequently Asked Questions
        </Heading>

        <Accordion.Root spaceY="4" variant="plain" collapsible>
          {faqs.map((faq, index) => (
            <Accordion.Item key={index} value={faq.value}>
              <Box 
                position="relative" 
                p={5} 
                mb={4} 
                bg="white" 
                boxShadow="md" 
                borderRadius="md" 
                transition="box-shadow 0.1s" 
                _hover={{ boxShadow: "lg" }}
              >
                {/* Clickable Entire Box */}
                <Accordion.ItemTrigger as="button" style={{ width: "100%", textAlign: "left", padding: "8px 0" }}>
                  <Span flex="1" fontWeight="medium" fontSize="lg" color="gray.800">
                    {faq.q}
                  </Span>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
              </Box>

              <Accordion.ItemContent>
                <Accordion.ItemBody p={3} color="gray.600">
                  {faq.a}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </Box>
  );
};
