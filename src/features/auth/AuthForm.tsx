import { useState, useEffect } from 'react';
import { useLoginMutation } from '../../services/authService';
import { setCredentials } from './authSlice';

import {
  Link as ReactRouterLink,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';

import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from 'formik';

import * as Yup from 'yup';
import YupPassword from 'yup-password';
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
          <Field name="email">
            {({
              field,
              form,
            }: {
              field: FieldInputProps<string>;
              form: FormikProps<Values>;
            }) => (
              <FormControl
                isInvalid={!!form.errors.email && form.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="email" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({
              field,
              form,
            }: {
              field: FieldInputProps<string>;
              form: FormikProps<Values>;
            }) => (
              <FormControl
                isInvalid={!!form.errors.password && form.touched.password}
                mt="3"
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    {...field}
                    id="password"
                    placeholder="password"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement w="4.5rem">
                    <Button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      size="sm"
                      h="1.75rem"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
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
