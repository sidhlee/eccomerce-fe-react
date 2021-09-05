import { Box, Heading } from '@chakra-ui/react';
import LoginForm from './LoginForm';

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <Box m="auto" maxW="400px">
      <Heading as="h1" my="5">
        Sign In
      </Heading>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
