import { Box, Heading } from '@chakra-ui/react';
import AuthForm from './AuthForm';

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <Box m="auto" maxW="400px">
      <Heading as="h1" my="5">
        Sign In
      </Heading>
      <AuthForm />
    </Box>
  );
};

export default LoginPage;
