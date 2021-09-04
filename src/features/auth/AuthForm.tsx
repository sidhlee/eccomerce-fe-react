import { useState, useEffect } from 'react';
import { useLoginMutation } from '../../services/authService';
import { setCredentials } from './authSlice';

import {
  Link as ReactRouterLink,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, Link, Text, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';

import * as Yup from 'yup';
import YupPassword from 'yup-password';
import FormikField from '../../common/components/FormikField';
YupPassword(Yup); // extend yup

type AuthFormProps = {};

interface Values {
  // Using username instead of email because Django Rest Framework takes username + password by default
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const { search } = useLocation();
  const history = useHistory();

  const redirect = search ? search.split('=')[1] : '/';

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, redirect, user]);

  // TODO: find better way to use error
  const [login, { isLoading, error }] = useLoginMutation();

  const toast = useToast();

  const handleSubmit = async (
    values: Values,
    // TODO: learn setSubmitting
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    console.log('handleSubmit');
    try {
      // get user from mutation function
      const user = await login(values).unwrap();
      // dispatch action with user payload
      dispatch(setCredentials(user));
    } catch (err) {
      console.log(err);
      const errorMessage = err.data?.detail
        ? err.data.detail
        : 'Could not login';
      toast({
        status: 'error',
        title: 'Error',
        description: errorMessage,
        isClosable: true,
      });
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().password().minUppercase(0).minSymbols(0).required(),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikField type="email" name="email" />
          <FormikField
            type="password"
            name="password"
            showPassword={showPassword}
            togglePassword={() => setShowPassword((v) => !v)}
          />
          <Button my={4} type="submit" isLoading={isLoading} isFullWidth>
            Sign In
          </Button>
        </Form>
      </Formik>
      <Text>
        First time?{' '}
        <Link
          as={ReactRouterLink}
          to={redirect ? `/register?redirect=${redirect}` : '/register'}
          color="blue.400"
          ml="3"
        >
          Register
        </Link>
      </Text>
    </>
  );
};

export default AuthForm;
