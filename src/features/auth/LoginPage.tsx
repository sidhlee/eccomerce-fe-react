import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import {
  Link as ReactRouterLink,
  useHistory,
  useLocation,
} from 'react-router-dom';
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLoginMutation } from '../../services/authService';
import { setCredentials } from './authSlice';
YupPassword(Yup); // extend yup

type LoginPageProps = {};

interface Values {
  // Using username instead of email because Django Rest Framework takes username + password by default
  username: string;
  password: string;
}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { search } = useLocation();
  const history = useHistory();

  const redirect = search ? search.split('=')[1] : '/';

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  // TODO: find better way to use error
  const [login, { isLoading, error }] = useLoginMutation();

  const toast = useToast();

  const handleSubmit = async (
    values: Values,
    // TODO: learn setSubmitting
    { setSubmitting }: FormikHelpers<Values>
  ) => {
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

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, redirect, user]);

  return (
    <Box m="auto" maxW="400px">
      <Heading as="h1" my="5">
        Sign In
      </Heading>

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .password()
            .minUppercase(0)
            .minSymbols(0)
            .required(),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="username">
            {({
              field,
              form,
            }: {
              field: FieldInputProps<string>;
              form: FormikProps<Values>;
            }) => (
              <FormControl
                isInvalid={!!form.errors.username && form.touched.username}
              >
                <FormLabel htmlFor="username">Email</FormLabel>
                <Input {...field} id="username" placeholder="email" />
                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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
    </Box>
  );
};

export default LoginPage;
