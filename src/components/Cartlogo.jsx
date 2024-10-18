import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa"; // You can use any cart icon

const CartLogo = ({ cartLength }) => {
  return (
    <Flex position="relative" alignItems="center">
      <Icon as={FaShoppingCart} w={6} h={6} />
      {cartLength > 0 && (
        <Box
          position="absolute"
          top="-1"
          right="-1"
          background="red"
          borderRadius="full"
          width="20px"
          height="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="12px"
        >
          {cartLength}
        </Box>
      )}
    </Flex>
  );
};

export default CartLogo;
