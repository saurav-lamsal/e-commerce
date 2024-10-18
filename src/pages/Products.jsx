import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useCartStore } from "../store/cartStore";
import Footer from "../components/Footer";
import {
  Box,
  Heading,
  Image,
  Text,
  Flex,
  Grid,
  Button,
  Divider,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Skeleton } from "antd";
import Search from "../components/search";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [change, setChange] = React.useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [proLoading, setProLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const toast = useToast();

  const addToCart = useCartStore((state) => state.addToCart);

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

  const getProducts = async (searchParams) => {
    try {
      let URL = `https://dummyjson.com/products`;

      if (category) {
        URL += `/category/${category}`;
      } else if (searchParams) {
        URL += `/search?q=${searchParams.get("query") || ""}`;
      }

      const queryParams = [];
      if (change) {
        if (["lowPrice", "highPrice"].includes(change)) {
          queryParams.push(
            `sortBy=price&order=${change === "lowPrice" ? "asc" : "desc"}`
          );
        } else if (["lowRate", "highRate"].includes(change)) {
          queryParams.push(
            `sortBy=rating&order=${change === "lowRate" ? "asc" : "desc"}`
          );
        }
      }

      if (queryParams.length > 0) {
        URL += `${searchParams ? "&" : "?"}${queryParams.join("&")}`;
      }

      const res = await axios.get(URL);
      setProducts(res.data.products);
      setProLoading(false);
    } catch (error) {
      console.log(error);
      setProLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleChange = (event) => {
    setChange(event.target.value);

    setSearchParams({ change: event.target.value });
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    setSearchParams({ category: event.target.value });
  };

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    }

    const searchFromUrl = searchParams.get("searchText");
    if (searchFromUrl) {
      setSearchText(searchFromUrl);
    }

    getProducts(searchParams);
  }, [category, change, searchParams, searchText]);

  return (
    <>
      <Flex
        gap={4}
        w={"100%"}
        alignItems="center"
        justifyContent="space-between"
        mb={6}
        mt="20px"
        px={{ base: 4, md: 4 }}
      >
        <Box display={"flex"} gap={4}>
          <Select
            overflow="hidden"
            placeholder="All Category"
            value={category}
            onChange={handleChangeCategory}
            bg="wheat"
            width="150px"
          >
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="home-decoration">Home Decoration</option>
            <option value="groceries">Groceries</option>
            <option value="kitchen-accessories">Kitchen Accessories</option>
          </Select>

          <Select
            placeholder="Sort By"
            value={change}
            onChange={handleChange}
            bg="wheat"
            width="150px"
          >
            <option value="lowPrice">Low to High price</option>
            <option value="highPrice">High to Low price</option>
            <option value="lowRate">Low to High Rating</option>
            <option value="highRate">High to Low Rating</option>
          </Select>
        </Box>

        <Search getProducts={(searchParams) => getProducts(searchParams)} />
      </Flex>

      <Divider />
      {proLoading ? (
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {[...Array(20)].map((_, ind) => (
            <Box key={ind} h="auto" mb={8}>
              <Skeleton active paragraph={{ rows: 4 }} />
            </Box>
          ))}
        </Grid>
      ) : (
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={6}
          p={"50px 50px"}
        >
          {products?.map((ele, ind) => (
            <Box
              key={ind}
              h="auto"
              mb={8}
              bg="white"
              borderRadius="md"
              boxShadow="md"
            >
              <Image
                src={ele.images[0]}
                alt={ele.name}
                borderRadius="md"
                width={{ base: "100%", md: "300px" }}
                height={{ base: "auto", md: "300px" }}
                objectFit="cover"
                margin="auto"
              />
              <Box p={4} overflow="hidden" textAlign={"center"}>
                <Heading as="h2" size="m" mb={2}>
                  {ele.title}
                </Heading>
                <Flex mb={5}>
                  <Text
                    size={9}
                    color="white"
                    bg="teal"
                    width="70%"
                    m="auto"
                    overflow="hidden"
                    borderRadius="5px"
                    p="5px"
                    textAlign="center"
                  >
                    {ele.category}
                  </Text>
                </Flex>
                <Flex gap={"10px"} justifyContent="center" mb={5}>
                  <Text
                    color="blue"
                    bg="wheat"
                    width="100px"
                    borderRadius="5px"
                    p="5px"
                  >
                    Rating: {ele.rating}
                  </Text>
                  <Text bg="yellow" width="125px" borderRadius="5px" p="5px">
                    Price: ${ele.price}
                  </Text>
                </Flex>
                <Divider />
                <Flex mt={5} justifyContent="center" gap={"10px"}>
                  <Button onClick={() => handleViewDetails(ele.id)} bg="grey">
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(ele)}
                    bg={"gray.200"}
                    _hover={{ bg: "#553C9A", color: "white" }}
                  >
                    Add to Cart
                  </Button>
                </Flex>
              </Box>
            </Box>
          ))}
        </Grid>
      )}
      <Footer />
    </>
  );
};

export default Products;
