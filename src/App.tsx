import { Box, ChakraProvider, Container, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './features/layout/Footer';
import Header from './features/layout/Header';
import LatestProducts from './features/products/LatestProducts';
import theme from './chakra-theme';
import ProductPage from './features/products/ProductPage';

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Flex
          direction="column"
          justifyContent="space-between"
          minHeight="100vh"
        >
          <Header />
          <Box as="main" py="3" flex="1">
            <Container maxW="container.lg">
              <Route path="/" exact>
                <LatestProducts />
              </Route>
              <Route path="/product/:id">
                <ProductPage />
              </Route>
            </Container>
          </Box>
          <Footer />
        </Flex>
      </ChakraProvider>
    </Router>
  );
}

export default App;
