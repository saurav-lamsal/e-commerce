import { useCartStore } from "../store/cartStore";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Heading,
  Box,
  Image,
} from "@chakra-ui/react";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();
  (state) => ({
    cart: state.cart,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
    removeFromCart: state.removeFromCart,
    clearCart: state.clearCart,
  });

  console.log("test");
  return (
    <Box my="30px">
      <Heading textAlign="center" mb="20px">
        Your Cart ({cart.length} items)
      </Heading>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Products</Th>
              <Th>Title</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Total Price</Th>
              {cart.length !== 0 && (
                <Th>
                  <Button colorScheme="red" onClick={clearCart}>
                    Remove All
                  </Button>
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((ele) => (
              <Tr key={ele.title}>
                <Td fontWeight="bold">
                  <Image src={ele.images[0]} w="70px" height={"50px"} />
                </Td>
                <Td>{ele.title}</Td>
                <Td>$ {ele.price}</Td>
                <Td>
                  <Button
                    onClick={() => decreaseQuantity(ele.id)}
                    mr="10px"
                    h="25px"
                  >
                    -
                  </Button>
                  {ele.quantity}
                  <Button
                    onClick={() => increaseQuantity(ele.id)}
                    ml="10px"
                    h="25px"
                  >
                    +
                  </Button>
                </Td>
                <Td>$ {(ele.price * ele.quantity).toFixed(2)}</Td>
                <Td>
                  <Button
                    onClick={() => removeFromCart(ele.id)}
                    _hover={{ bg: "red" }}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr h={"50px"}>
              <Th></Th>
              <Th></Th>
              <Th fontWeight="bold" fontSize="18px">
                Total Price :
              </Th>
              <Th fontWeight="bold" fontSize="18px">
                ${" "}
                {cart
                  .reduce((acc, ele) => acc + ele.price * ele.quantity, 0)
                  .toFixed(2)}
              </Th>
            </Tr>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th>
                <Button colorScheme="green">Checkout</Button>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Cart;
