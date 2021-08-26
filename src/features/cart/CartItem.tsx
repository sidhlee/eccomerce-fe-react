import { Box, Divider, Image, List, ListItem, Text } from '@chakra-ui/react';
import QuantitySelect from '../../common/components/QuantitySelect';
import { ICartItem } from './cartTypes';

type CartItemProps = {
  cartItems: ICartItem[];
  handleQuantityChange: (valueString: string, item: ICartItem) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  cartItems,
  handleQuantityChange,
}) => {
  return (
    <List mt="5">
      {cartItems.map((item) => (
        <>
          <Divider />
          <ListItem key={item.variant} display="flex" py="7">
            <Box pos="relative" flex="1">
              {/* TODO: fetch thumbnail url from server */}
              <Image
                pos="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                src={item.thumbnailUrl}
                alt={item.name}
                objectFit="contain"
              />
            </Box>
            <Box flex="1">
              <Text mb="2" fontSize="lg">
                ${item.price}
              </Text>
              <Text>{item.name}</Text>
              <Text mb="2" fontSize="sm" color="gray.500">
                {item.productName}
              </Text>
              <QuantitySelect
                handleQuantityChange={(valueString: string) => {
                  handleQuantityChange(valueString, item);
                }}
                defaultValue={item.qty}
                labelHidden
              />
            </Box>
          </ListItem>
        </>
      ))}
    </List>
  );
};

export default CartItem;
