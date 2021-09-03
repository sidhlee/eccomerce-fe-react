import { Box, Heading } from '@chakra-ui/react';

type SignupPageProps = {};

const SignupPage: React.FC<SignupPageProps> = () => {
  return (
    <Box m="auto" maxW="400px">
      <Heading as="h1" my="5">
        Sign Up
      </Heading>
    </Box>
  );
};

export default SignupPage;
