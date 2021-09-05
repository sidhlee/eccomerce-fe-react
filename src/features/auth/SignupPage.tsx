import { Box, Heading } from '@chakra-ui/react';
import { useAuthRedirect } from './authHooks';
import SignupForm from './SignupForm';

type SignupPageProps = {};

const SignupPage: React.FC<SignupPageProps> = () => {
  useAuthRedirect();

  return (
    <Box m="auto" maxW="400px">
      <Heading as="h1" my={[4, 5, '3rem', '3rem']}>
        Sign Up
      </Heading>
      <SignupForm />
    </Box>
  );
};

export default SignupPage;
