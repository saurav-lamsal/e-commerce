import { Heading, Box } from "@chakra-ui/react";
import Footer from "../components/Footer"; // Assuming the footer component is located in the correct directory

const HomePage = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Heading textAlign="center" mt={8}>
        WELCOME TO THE HOME PAGE !!!!
      </Heading>
      <Box flex="1"></Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
