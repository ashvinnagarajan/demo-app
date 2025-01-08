import {
  Box,
  Center,
  Container,
  Flex,
  Text,
  Image,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { FAQSection } from "./product/FAQSection";
import { Feature } from "./product/Feature";
import { HeroSection } from "./product/HeroSection";
// import { Layout } from "./components/Layout";
// import { PricingSection } from "./components/PricingSection";
import { Helmet } from "react-helmet";

const faqs = [
    {
      q: "How many cards can I issue?",
      a: "You can issue up to 3 cards with our Free plan. Upgrade to Pro for additional cards and features.",
    },
    {
      q: "Can I link my credit card to financial tools?",
      a: "Yes! We support integrations with Mint, YNAB, and QuickBooks for seamless financial tracking.",
    },
    {
      q: "Do you support international transactions?",
      a: "Yes - transactions can be made from and to any country with no additional fees.",
    },
    {
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
  
  const features = [
    {
      title: "Real-Time Spending Insights",
      description:
        "Monitor your transactions in real-time with detailed breakdowns and spending trends.",
      image:
        "https://images.unsplash.com/photo-1585202900225-6d3ac20a6962",
    },
    {
      title: "Fraud Protection",
      description:
        "Advanced security features keep your transactions safe with real-time alerts and card freezing options.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    },
    {
      title: "Easy Payments",
      description:
        "Set up auto-payments and reminders to avoid late fees and manage your credit responsibly.",
      image:
        "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
    },
  ];
  

function ProductPage() {
  return (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Biller | Get paid faster</title>
      </Helmet>
      <Box bg="gray.50">
        <HeroSection />
        <Container maxW="container.xl">
          <Center p={[0, 10]}>
            <video
              playsInline
              autoPlay
              muted
              poster="https://launchman-space.nyc3.digitaloceanspaces.com/biller-hero-2.png"
              loop
            >
              <source
                src="https://launchman-space.nyc3.digitaloceanspaces.com/biller-hero-2.webm"
                type="video/mp4"
              />
            </video>
          </Center>
        </Container>

        <Container maxW="container.2xl" centerContent py={[20]}>
          <Text color="gray.600" fontSize="lg">
            Used by teams worldwide
          </Text>

          <Flex
            spacing={[10, 20]}
            mt={8}
            align="center"
            justify="center"
            w="full"
          >
            <Box>
              <Image src="microsoft-logo.svg" alt="Microsoft logo" />
            </Box>

            <Box>
              <Image src="adobe-logo.svg" alt="Adobe logo" />
            </Box>

            <Box>
              <Image src="microsoft-logo.svg" alt="Microsoft logo" />
            </Box>

            <Box>
              <Image src="adobe-logo.svg" alt="Adobe logo" />
            </Box>
          </Flex>
        </Container>

        <VStack
          backgroundColor="white"
          w="full"
          id="features"
          spacing={16}
          py={[16, 0]}
        >
          {features.map(
            ({ title, description, image }, i) => {
              return (
                <Feature
                  key={`feature_${i}`}
                  title={title}
                  description={description}
                  image={image}
                  reverse={i % 2 === 1}
                />
              );
            }
          )}
        </VStack>

        <Container maxW="container.md" centerContent py={[8, 28]}>
          <SimpleGrid spacingX={10} spacingY={20} minChildWidth="300px">
            {highlights.map(({ title, description, icon }, i) => (
              <Box p={4} rounded="md" key={`highlight_${i}`}>
                <Text fontSize="4xl">{icon}</Text>

                <Text fontWeight={500}>{title}</Text>

                <Text color="gray.500" mt={4}>
                  {description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>

        <Container py={28} maxW="container.lg" w="full" id="pricing">
          {/* <PricingSection /> */}
        </Container>

        <Container py={28} maxW="container.md">
          <Box w="full">
            <VStack spacing={10} w="full">
                <Text fontWeight={500} fontSize="2xl" align="center">
                    Frequently asked questions
                </Text>
                <FAQSection items={faqs} />
            </VStack>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default ProductPage