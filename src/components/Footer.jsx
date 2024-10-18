import { Box, Flex, Text, Link, IconButton } from "@chakra-ui/react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="#553C9A" color="white" py={8}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        px={6}
        maxW="1200px"
        mx="auto"
      >
        <Box>
          <Text fontSize="lg">Contact Us:</Text>
          <Text fontSize="sm">Phone: +977 9851328488</Text>
          <Text fontSize="sm">Email: shopme@gmail.com</Text>
        </Box>
        <Flex>
          <IconButton
            as={Link}
            href="#"
            size={"lg"}
            aria-label="Instagram"
            icon={<FaInstagram />}
            variant="ghost"
            color="white"
            mr={4}
            _hover={{ color: "blue.500" }}
          />
          <IconButton
            as={Link}
            href="#"
            size={"lg"}
            aria-label="Facebook"
            icon={<FaFacebook />}
            variant="ghost"
            color="white"
            _hover={{ color: "blue.500" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
