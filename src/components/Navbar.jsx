import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import {
  Flex,
  Text,
  useToast,
  Spacer,
  HStack,
  Box,
  Button,
} from "@chakra-ui/react";
import { useCartStore } from "../store/cartStore";
import CartLogo from "./Cartlogo";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const cart = useCartStore((state) => state.cart);
  const cartLength = cart.length;
  const toast = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <Flex
      w={"100%"}
      // m={"auto"}
      bg={"#553C9A"}
      justifyContent={"space-around"}
      alignItems={"center"}
      padding={"15px"}
      position={"sticky"}
      top={"0"}
      zIndex={"1"}
    >
      <Box pl={"20px"}>
        <HStack spacing={"24px"}>
          <Text
            color={"white"}
            p={"3px 10px"}
            _hover={{ bg: "white", color: "black" }}
            borderRadius={"5px"}
          >
            <Link to={isAuth ? "/" : "/login"}>HOME</Link>
          </Text>

          <Text
            color={"white"}
            p={"3px 10px"}
            _hover={{ bg: "white", color: "black" }}
            borderRadius={"5px"}
          >
            <Link to={isAuth ? "/products" : "/login"}>PRODUCTS</Link>
          </Text>
        </HStack>
      </Box>

      <Spacer />
      <Box
        position={"relative"}
        mt={"5px"}
        me={"30px"}
        textColor={"white"}
        pb={"10px"}
        textAlign={"left"}
      >
        <Link to={isAuth ? "/cart" : "/login"}>
          <CartLogo cartLength={cartLength} />
        </Link>
      </Box>
      <Button
        color={"white"}
        p={"3px 10px"}
        _hover={{ bg: "white", color: "black" }}
        borderRadius={"5px"}
      >
        {!isAuth ? (
          <Link to="/login">LOGIN</Link>
        ) : (
          <Button onClick={handleLogout}>LOGOUT</Button>
        )}
      </Button>
    </Flex>
  );
};

export default Navbar;
