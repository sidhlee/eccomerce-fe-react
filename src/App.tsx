import { ChakraProvider } from '@chakra-ui/react';
import Footer from './features/layout/Footer';
import Header from './features/layout/Header';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Header />
        <h1>App</h1>
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
