import { Heading, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../../common/components/Loader';
import ProductCard from './ProductCard';
import { fetchProductsThunk } from './productsSlice';

type HomeScreenProps = {};

const HomePage: React.FC<HomeScreenProps> = () => {
  const dispatch = useAppDispatch();
  const { productList, error, loading } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  return (
    <div>
      <Heading as="h1" my="5">
        Latest Products
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} gap="5">
          {productList.map((p) => {
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
      )}
    </div>
  );
};

// TODO: cache products
export default HomePage;
