import { Heading, SimpleGrid } from '@chakra-ui/react';
import Loader from '../../common/components/Loader';
import ProductCard from './ProductCard';
import { useGetProductsQuery } from '../../services/product';

type HomeScreenProps = {};

const HomePage: React.FC<HomeScreenProps> = () => {
  const {
    data: productList,
    error,
    isLoading,
  } = useGetProductsQuery(undefined);

  return (
    <div>
      <Heading as="h1" my="5">
        Latest Products
      </Heading>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h3>Could not load the product data. Please try again later.</h3>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} gap="5">
          {productList?.map((p) => {
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
