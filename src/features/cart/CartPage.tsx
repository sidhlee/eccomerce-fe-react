import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  Link as ReactRouterLink,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Message from '../../common/components/Message';
import { useGetVariantByIdQuery } from '../../services/product';
import CartItem from './CartItem';
import { addCartItem } from './cartSlice';
import { ICartItem } from './cartTypes';

type CartPageProps = {};

interface LocationState {
  search: string;
}

const CartPage: React.FC<CartPageProps> = () => {
  const { params } = useRouteMatch<{ id: string }>();
  const { search } = useLocation<LocationState>();

  const variantId = params.id;
  const qty = search ? search.split('=')[1] : 1;

  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector((state) => state.cart);

  const { isLoading, error, data: variant } = useGetVariantByIdQuery(variantId);

  useEffect(() => {
    if (variantId && variant) {
      dispatch(
        addCartItem({
          variant: variant.id,
          name: variant.name,
          productName: variant.product_name,
          imageUrl: variant.image_url,
          thumbnailUrl: variant.thumbnail_url,
          price: variant.price,

          qty: +qty,
        })
      );
    }
  }, [dispatch, variantId, qty, variant]);

  const handleQuantityChange = (valueString: string, item: ICartItem) => {
    dispatch(
      addCartItem({
        variant: item.variant,
        name: item.name,
        productName: item.productName,
        imageUrl: item.imageUrl,
        thumbnailUrl: item.thumbnailUrl,
        price: item.price,
        qty: +valueString,
      })
    );
  };

  return (
    <Flex direction={['column', 'column', 'column', 'row']}>
      <Box flex="2">
        <Heading as="h1">My Cart</Heading>
        {cartItems.length === 0 ? (
          <Message status="info">
            Your cart is empty{' '}
            <Button as={ReactRouterLink} to="/" ml="auto">
              Go Back
            </Button>
          </Message>
        ) : (
          <CartItem
            cartItems={cartItems}
            handleQuantityChange={handleQuantityChange}
          />
        )}
      </Box>
      <Box flex="1"></Box>
    </Flex>
  );
};

export default CartPage;
