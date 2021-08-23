import { Heading, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { IProduct } from './types';

type HomeScreenProps = {};

const HomePage: React.FC<HomeScreenProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get<IProduct[]>('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Heading as="h1" my="5">
        Latest Products
      </Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} gap="5">
        {products.map((p) => {
          const popularVariant = p.variants[0];
          return (
            <ProductCard
              key={p.id}
              id={p.id}
              category={popularVariant.product_name || ''}
              name={p.name}
              likes={popularVariant.likes}
              price={popularVariant.price || ''}
              image_url={popularVariant.image_url}
            />
          );
        })}
      </SimpleGrid>
    </div>
  );
};

// TODO: cache products
export default HomePage;
