import { useEffect } from 'react';

import {
  Link as ReactRouterLink,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { Box, Button, Link, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import FormikField from '../../common/components/FormikField';
import PasswordField from './PasswordField';

type AuthFormProps = {
  isSignup?: boolean;
  handleSubmit: (values: any) => void;
  isLoading: boolean;
  initialValues: any;
  validationSchema: any;
};

const AuthForm: React.FC<AuthFormProps> = ({
  isSignup = false,
  handleSubmit,
  isLoading,
  initialValues,
  validationSchema,
}) => {
  const user = useAppSelector((state) => state.auth.user);

  const { search } = useLocation();
  const history = useHistory();

  const redirect = search ? search.split('=')[1] : '/';

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, redirect, user]);

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {isSignup && (
            <FormikField type="text" name="username" placeholder="Username" />
          )}
          <FormikField type="email" name="email" placeholder="Email" />
          <PasswordField name="password" placeholder="Password" />
          {isSignup && (
            <PasswordField
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          )}
          <Button my={4} type="submit" isLoading={isLoading} isFullWidth>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </Form>
      </Formik>
      <Text>
        {isSignup ? 'Already have an account?' : 'First time?'}{' '}
        <Link
          as={ReactRouterLink}
          to={isSignup ? '/login' : '/signup'}
          color="blue.400"
          ml="3"
        >
          {isSignup ? 'Login' : 'Register'}
        </Link>
      </Text>
    </Box>
  );
};

export default AuthForm;
