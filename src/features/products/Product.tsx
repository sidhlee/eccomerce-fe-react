import {
  Badge,
  Box,
  Flex,
  Image,
  Heading,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';

type ProductProps = {
  id: string;
  category: string;
  name: string;
  likes: number;
  price: string;
  sale_price?: string | undefined;
  image_url: string;
};

const Product: React.FC<ProductProps> = (props) => {
  const { id, category, name, likes, price, sale_price, image_url } = props;
  return (
    <Link
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      d="flex"
      flexDirection="column"
      href={`/product/${id}`}
    >
      <Image src={image_url} alt={name} />
      <Flex p="6" flex="1" direction="column" justifyContent="space-between">
        <Box d="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            mr="2"
          >
            {category}
          </Box>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Box>
        <Flex justifyContent="space-between" my="3">
          <Heading
            fontWeight="semibold"
            as="h3"
            size="sm"
            lineHeight="tight"
            mr="1"
          >
            {name}
          </Heading>
          <Flex>
            <IconButton icon={<FiHeart />} aria-label="like" size="sm" mr="1" />
            <Box as="span">{likes}</Box>
          </Flex>
        </Flex>

        <Box justifySelf="end">
          ${price}
          {sale_price ? (
            <Box as="span" color="gray.600" fontSize="sm">
              {sale_price}
            </Box>
          ) : null}
        </Box>
      </Flex>
    </Link>
  );
};

export default Product;