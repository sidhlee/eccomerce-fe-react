import { Box, ChakraProvider, Container, Flex } from '@chakra-ui/react';
import Footer from './features/layout/Footer';
import Header from './features/layout/Header';
import LatestProducts from './features/products/LatestProducts';
import theme from './chakra-theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" justifyContent="space-between" minHeight="100vh">
        <Header />
        <Box as="main" py="3" flex="1">
          <Container maxW="container.lg">
            <LatestProducts />
          </Container>
        </Box>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
