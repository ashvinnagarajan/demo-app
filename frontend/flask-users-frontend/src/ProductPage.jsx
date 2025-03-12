import { Container, Box } from "@chakra-ui/react";
import { FaqSection } from "./product/FaqSection";
import { Header } from "./product/Header"
import { HeroSection } from "./product/HeroSection";
import { Helmet } from "react-helmet";
import FlyingSpirit from "./utils/flyingSpirit";
import PageActionBar from "./components/PageActionBar";

function ProductPage() {
    return (
        <Box bg="green.50" minHeight="100vh">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Biller | Get Paid Faster</title>
        </Helmet>

        <Header />

        <FlyingSpirit />

        <Container>
            <HeroSection />

            <FaqSection />
        </Container>

        <PageActionBar pageTitle="Product" />

        </Box>
    );
  };
  
  export default ProductPage