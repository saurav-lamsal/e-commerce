import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import SingleProducts from "../pages/SingleProducts";
import { AuthContext } from "../context/AuthContextProvider";
import Cart from "../pages/Cart";
import { Spinner } from "@chakra-ui/react";

const AllRoutes = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return (
      <Spinner
        ml="50%"
        mt="50%"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="black.500"
        size="xl"
      />
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={isAuth ? <Products /> : <Login />} />
        <Route
          path="/products/:product_id"
          element={isAuth ? <SingleProducts /> : <Login />}
        />
        <Route path="/cart" element={isAuth ? <Cart /> : <Login />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
