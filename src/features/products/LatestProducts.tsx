import { Heading, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Product from './ProductCard';
import { IProduct } from './types';

type HomeScreenProps = {};

const HomePage: React.FC<HomeScreenProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get<IProduct[]>(
        'http://localhost:8000/api/products'
      );
      setProducts(data);
    };
    fetchProduct();
  }, []);

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
            category={p.sync_variants[0].product.name || ''}
            name={p.sync_product.name}
            likes={111}
            price={p.sync_variants[0].retail_price || ''}
            image_url={p.sync_product.thumbnail_url}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

// TODO: cache products
export default HomePage;
