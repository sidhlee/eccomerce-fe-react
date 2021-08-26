import { useRouteMatch, Link as ReactRouterLink, useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';

import LikeButton from '../../common/components/LikeButton';
import { ChangeEvent, useState } from 'react';
import { useGetProductByIdQuery } from '../../services/product';
import { IVariant } from './productsTypes';
import Loader from '../../common/components/Loader';
import Message from '../../common/components/Message';

type ProductPageProps = {};

const ProductPage: React.FC<ProductPageProps> = () => {
  const { params } = useRouteMatch<{ id: string }>();

  const { data: product, error, isLoading } = useGetProductByIdQuery(params.id);
  const [variantIndex, setVariantIndex] = useState(0);

  const variants = product?.variants! || [];
  const currentVariant = variants[variantIndex] as IVariant;

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVariantIndex(+e.target.value);
  };


  const [quantity, setQuantity] = useState(1);

  // Chakra UI's NumberInput passes valueString into onChange handler, not the event object.
  const handleQuantityChange = (valueString: string) => {
    setQuantity(+valueString)
  }
  
  const history = useHistory()
  
  const handleAddToCartClick = () => {
    const variantId = currentVariant.id
    history.push(`/cart/${variantId}?qty=${quantity}`)
  }
  
  const imgSrc = currentVariant?.image_url;
  return (
    <Container maxWidth="container.lg">
      <Button as={ReactRouterLink} to="/">
        Go back
      </Button>
      <SimpleGrid columns={[1, 2, 2, 2]}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message status="error">
            Could not load the product data. Please try again later.
          </Message>
        ) : (
          <>
            <Image src={imgSrc} />
            <VStack
              alignSelf="center"
              justify="start"
              align="start"
              spacing="5"
            >
              <Flex w="100%" justifyContent="space-between">
                <Heading as="h1">{currentVariant.name}</Heading>
                <LikeButton likes={currentVariant.likes} />
              </Flex>
              <Text>{currentVariant?.name}</Text>
              <Text as="span" fontSize="xl">
                CA ${currentVariant?.price}
              </Text>
              <Wrap as="form" w="100%" spacing="4">
                {variants.length > 1 ? (
                  <FormControl mb="3" flex="1 1" minW="fit-content">
                    <FormLabel>Variant</FormLabel>
                    <Select onChange={handleSelectChange} value={variantIndex}>
                      {variants?.map((v, i) => (
                        <option key={v.name} value={i}>
                          {v.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                ) : null}
                <FormControl flex="1 1">
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput defaultValue={1} min={1} onChange={handleQuantityChange}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <Button
                  w="100%"
                  size="lg"
                  fontWeight="bold"
                  bg="pink.100"
                  _hover={{ bg: 'pink.200' }}
                  onClick={handleAddToCartClick}
                >
                  Add to cart
                </Button>
              </Wrap>
            </VStack>
          </>
        )}
      </SimpleGrid>
    </Container>
  );
};

export default ProductPage;
