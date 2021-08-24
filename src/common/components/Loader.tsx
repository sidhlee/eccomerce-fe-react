import { Center, Spinner } from '@chakra-ui/react';

type LoaderProps = {};

const Loader: React.FC<LoaderProps> = () => {
  return (
    <Center h="50vh">
      <Spinner label="Loading..." color="gray.300" />
    </Center>
  );
};

export default Loader;
