import { useRouteMatch, Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
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
import products from '../../temp/products';
import LikeButton from '../../components/LikeButton';
import { ChangeEvent, useState } from 'react';

type ProductPageProps = {};

const ProductPage: React.FC<ProductPageProps> = () => {
  const { params } = useRouteMatch<{ id: string }>();
  const product = products.find(
    (p) => p.sync_product.id.toString() === params.id
  );
  const variants = product?.sync_variants!;
  const [variantIndex, setVariantIndex] = useState(0);
  const variant = variants[variantIndex];

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVariantIndex(+e.target.value);
  };
  const imgSrc = variant.files
    ? variant.files[1].preview_url
    : product?.sync_product.thumbnail_url;

  return (
    <Container maxWidth="container.lg">
      <Button as={ReactRouterLink} to="/">
        Go back
      </Button>
      <SimpleGrid columns={[1, 2, 2, 2]}>
        <Image src={imgSrc} />
        <VStack alignSelf="center" justify="start" align="start" spacing="5">
          <Flex w="100%" justifyContent="space-between">
            <Heading as="h1">{variant.name}</Heading>
            <LikeButton likes={11} />
          </Flex>
          <Text>{variant.product?.name}</Text>
          <Text as="span" fontSize="xl">
            CA ${variant.retail_price}
          </Text>
          <Wrap as="form" w="100%" spacing="4">
            {variants.length > 1 ? (
              <FormControl mb="3" flex="1 1" minW="fit-content">
                <FormLabel>Variant</FormLabel>
                <Select onChange={handleSelectChange} value={variantIndex}>
                  {variants?.map((v, i) => (
                    <option value={i}>{v.name}</option>
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
      </SimpleGrid>
    </Container>
  );
};

export default ProductPage;
