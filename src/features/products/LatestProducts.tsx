import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import products from '../../temp/products';
import Product from './Product';

type HomeScreenProps = {};

const HomePage: React.FC<HomeScreenProps> = () => {
  return (
    <div>
      <Heading as="h1" my="5">
        Latest Products
      </Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} gap="5">
        {products.map((p) => (
          <Product
            key={p.sync_product.id}
            id={p.sync_product.id.toString()}
            category={p.sync_variants[0].product.name}
            name={p.sync_product.name}
            likes={111}
            price={p.sync_variants[0].retail_price}
            image_url={p.sync_product.thumbnail_url}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default HomePage;
