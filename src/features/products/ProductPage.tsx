import { useRouteMatch, Link as ReactRouterLink } from 'react-router-dom';
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

import LikeButton from '../../components/LikeButton';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from './types';

type ProductPageProps = {};

const ProductPage: React.FC<ProductPageProps> = () => {
  const { params } = useRouteMatch<{ id: string }>();

  const [product, setProduct] = useState<IProduct | null>();
  const [variantIndex, setVariantIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get('/api/products/' + params.id);
      setProduct(data);
    };
    fetchProduct();
  }, [params.id]);

  const variants = product?.variants! || [];
  const currentVariant = variants.length > 0 ? variants[variantIndex] : null;

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVariantIndex(+e.target.value);
  };
  const imgSrc = currentVariant?.image_url;

  return (
    <Container maxWidth="container.lg">
      <Button as={ReactRouterLink} to="/">
        Go back
      </Button>
      <SimpleGrid columns={[1, 2, 2, 2]}>
        {product && currentVariant ? (
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
                  <NumberInput defaultValue={1} min={1}>
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
                >
                  Add to cart
                </Button>
              </Wrap>
            </VStack>
          </>
        ) : null}
      </SimpleGrid>
    </Container>
  );
};

export default ProductPage;
