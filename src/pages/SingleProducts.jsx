import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Heading,
  Flex,
  Box,
  Image,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Skeleton } from "antd";
import { useCartStore } from "../store/cartStore";

const SingleProducts = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  const { product_id } = useParams();
  const [singleProducts, setSingleProduct] = useState([]);
  const [proLoading, setProLoading] = useState(true);

  const toast = useToast();

  const handleAddToCart = (ele) => {
    addToCart(ele);
    toast({
      title: "Added to Cart",
      description: `${ele.title} has been added to your cart.`,
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top-right",
      containerStyle: {
        paddingTop: "50px",
      },
    });
  };

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${product_id}`
      );
      console.log(res.data);
      setSingleProduct([res.data]);
      setProLoading(false);
    } catch (error) {
      console.log(error);
      setProLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <>
      {proLoading ? (
        <Flex justifyContent="center">
          {[...Array(1)].map((_, ind) => (
            <Box
              key={ind}
              width={500}
              borderWidth="1px"
              borderRadius="lg"
              m={4}
              mt={"10rem"}
              padding={"2rem"}
            >
              <Skeleton active paragraph={{ rows: 5 }} />
            </Box>
          ))}
        </Flex>
      ) : (
        <Flex justifyContent="center" pt={"150px"}>
          {singleProducts.map((ele, ind) => (
            <Box
              key={ind}
              width={800}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              m={4}
              boxShadow="lg"
              padding={10}
              display={"flex"}
            >
              <Box p={1}>
                <Image src={ele.images[0]} alt={ele.title} w={500} />
              </Box>
              <Box p="6" width={700}>
                <Box d="flex" alignItems="baseline">
                  <Heading fontSize="28" fontWeight="bold">
                    {ele.title}
                  </Heading>
                  <Text
                    fontSize="20"
                    mt={2}
                    color={"white"}
                    bg={"teal"}
                    width={"300px"}
                    borderRadius={"5px"}
                    padding={"5px"}
                  >
                    {ele.category}
                  </Text>
                  <Text
                    fontSize="15"
                    color={"white"}
                    bg={"teal"}
                    width={"300px"}
                    borderRadius={"5px"}
                    padding={"5px"}
                    mt={2}
                  >
                    price: ${ele.price}
                  </Text>
                  <Text
                    fontSize="15"
                    color={"white"}
                    bg={"teal"}
                    width={"300px"}
                    borderRadius={"5px"}
                    padding={"5px"}
                    mt={2}
                  >
                    Rating: {ele.rating}
                  </Text>
                </Box>
                <Text mt={7} fontSize="17" align={"justify"}>
                  {ele.description}
                </Text>
                <Box mt={5}>
                  <Button
                    _hover={{ bg: "black", color: "white" }}
                    w={"100%"}
                    onClick={() => handleAddToCart(ele)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      )}
    </>
  );
};
export default SingleProducts;
