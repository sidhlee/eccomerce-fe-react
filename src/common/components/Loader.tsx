import { Center, Spinner } from '@chakra-ui/react';

type LoaderProps = {};

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <Center h="50vh" position="absolute" width="100%">
      <Spinner label="Loading..." color="gray.300" />
    </Center>
  );
};

export default Loader;
