import { Input } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

const Search = ({ getProducts }) => {
  const [, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setSearchParams({ query: value });
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 1000), []);

  return (
    <Input
      onChange={debouncedHandleSearch}
      position={"relative"}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          getProducts(searchParams);
        }
      }}
      width={{ base: "100%", md: "300px" }}
      type="text"
      placeholder="Search..."
      bg="white"
      color="black"
      border="1px solid black"
      borderRadius="5px"
      p="3px 10px"
      _focus={{ outline: "none" }}
    />
  );
};

Search.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

export default Search;
