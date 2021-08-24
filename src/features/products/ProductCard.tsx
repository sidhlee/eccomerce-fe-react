import { Badge, Box, Flex, Image, Heading, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import LikeButton from '../../common/components/LikeButton';

type ProductCardProps = {
  id: number;
  category: string;
  name: string;
  likes: number;
  price: string;
  sale_price?: string | undefined;
  image_url: string;
};

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { id, category, name, likes, price, sale_price, image_url } = props;
  console.log(image_url);

  return (
    <Link
      as={ReactRouterLink}
      to={`/product/${id}`}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      d="flex"
      flexDirection="column"
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
          <LikeButton likes={likes} />
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

export default ProductCard;
