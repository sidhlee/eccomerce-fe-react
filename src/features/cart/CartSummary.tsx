import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { ICartItem } from './cartTypes';

type CartSummaryProps = {
  cartItems: ICartItem[];
};

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
  const itemsCount = cartItems.reduce((count, item) => count + item.qty, 0);
  const totalPrice = cartItems
    .reduce((total, item) => total + item.qty * parseFloat(item.price), 0)
    .toFixed(2);

  const history = useHistory();

  const handleCheckoutClick = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Box>
      <Heading size="lg" mb="3">
        Summary
      </Heading>
      <Divider />
      <Flex py="3">
        <Text>{itemsCount} items</Text>
        <Text ml="auto"> CA ${totalPrice}</Text>
      </Flex>
      <Divider />
      <Box mt="5">
        <Button
          type="button"
          isFullWidth
          isDisabled={cartItems.length <= 0}
          bg="blackAlpha.900"
          _hover={{ bg: 'blackAlpha.800' }}
          color="white"
          onClick={handleCheckoutClick}
        >
          Continue to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartSummary;
