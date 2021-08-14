import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Heading,
} from '@chakra-ui/react';
import Footer from './features/layout/Footer';
import Header from './features/layout/Header';

function App() {
  return (
    <ChakraProvider>
      <Flex direction="column" justifyContent="space-between" minHeight="100vh">
        <Header />
        <Box as="main" py="3">
          <Container>
            <Heading
              as="h1"
              size="2xl"
              fontWeight="normal"
              textTransform="uppercase"
            >
              Welcome
            </Heading>
          </Container>
        </Box>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
