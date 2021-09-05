import { useLoginMutation } from '../../services/authService';
import { setCredentials } from './authSlice';
import { useAppDispatch } from '../../app/hooks';
import { useToast } from '@chakra-ui/react';
import AuthForm from './AuthForm';

import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup); // extend yup

type LoginFormProps = {};

interface LoginValues {
  // Using username instead of email because Django Rest Framework takes username + password by default
  email: string;
  password: string;
}

const initialValues: LoginValues = {
  email: '',
  password: '',
};

const LoginForm: React.FC<LoginFormProps> = () => {
  const dispatch = useAppDispatch();
  // TODO: find better way to use error
  const [login, { isLoading /* error */ }] = useLoginMutation();

  const toast = useToast();

  const handleSubmit = async (values: LoginValues) => {
    try {
      // get user from mutation function
      const user = await login(values).unwrap();
      // dispatch action with user payload
      dispatch(setCredentials(user));
    } catch (err) {
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
    email: Yup.string().email('Invalid email address').required(),
    password: Yup.string().password().minUppercase(0).minSymbols(0).required(),
  });

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      initialValues={initialValues}
      validationSchema={validationSchema}
    />
  );
};

export default LoginForm;
