import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import AddressForm from './AddressForm';

type ShippingPageProps = {};

const ShippingPage: React.FC<ShippingPageProps> = () => {
  return (
    <Box m="auto">
      <Heading as="h1" my={[4, 5, '3rem', '3rem']}>
        Shipping
      </Heading>
      <SimpleGrid columns={[1, 2, 2, 2]}>
        <Box minW="300px" maxW="400px">
          <Heading size="lg">Address</Heading>
          <AddressForm />
        </Box>
        <Box>
          <Heading size="lg">Items</Heading>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ShippingPage;
