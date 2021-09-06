import { Box, ChakraProvider, Container, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from '../features/layout/Footer';
import LatestProducts from '../features/products/LatestProducts';
import theme from '../common/style/chakra-theme';
import ProductPage from '../features/products/ProductPage';
import CartPage from '../features/cart/CartPage';
import LoginPage from '../features/auth/LoginPage';
import Navbar from '../features/layout/Navbar';
import SignupPage from '../features/auth/SignupPage';
import AccountPage from '../features/account/AccountPage';
import ShippingPage from '../features/checkout/ShippingPage';

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Flex
          direction="column"
          justifyContent="space-between"
          minHeight="100vh"
        >
          <Navbar />
          <Box as="main" py="3" flex="1">
            <Container maxW="container.lg">
              <Route path="/" exact>
                <LatestProducts />
              </Route>
              <Route path="/product/:id">
                <ProductPage />
              </Route>
              {/* make id param optional */}
              <Route path="/cart/:id?">
                <CartPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignupPage />
              </Route>
              <Route path="/account">
                <AccountPage />
              </Route>
              <Route path="/shipping">
                <ShippingPage />
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
