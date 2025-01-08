import {
    Button,
    Box,
  } from "@chakra-ui/react";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionRoot,
  } from "../components/ui/accordion"
  
export const FAQSection = ({ items }) => {
    return (
        <Box borderRadius="lg" w="full" p={4}>
        <AccordionRoot>
            {items.map((item, i) => {
            return (
                <AccordionItem key={`faq_${i}`}>
                <h2>
                    <Button>
                    <Box flex="1" textAlign="left">
                        {item.q}
                    </Box>
                    </Button>
                </h2>

                <AccordionItemContent  pb={4}>{item.a}</AccordionItemContent >
                </AccordionItem>
            );
            })}
        </AccordionRoot>
        </Box>
    );
};