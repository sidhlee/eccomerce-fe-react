import { useSignupMutation } from '../../services/authService';
import { setCredentials } from '../auth/authSlice';
import { useAppDispatch } from '../../app/hooks';
import { useToast, Box } from '@chakra-ui/react';
import AuthForm from '../auth/AuthForm';

import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useEffect } from 'react';
import { useUserProfileQuery } from '../../services/profileService';
YupPassword(Yup); // extend yup

type SignupFormProps = {};

interface SignupValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignupValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupForm: React.FC<SignupFormProps> = () => {
  const dispatch = useAppDispatch();
  // TODO: find better way to use error
  const [signup, { isLoading /* error */ }] = useSignupMutation();

  const toast = useToast();

  const handleSubmit = async (values: SignupValues) => {
    try {
      const { username, email, password } = values;
      const body = {
        username,
        email,
        password,
      };
      // get user from mutation function
      const user = await signup(body).unwrap();
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

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email('Invalid email address').required(),
    password: Yup.string().password().minUppercase(0).minSymbols(0).required(),
    confirmPassword: Yup.string().test(
      'passwords-match',
      'Passwords must match',
      function (value) {
        return this.parent.password === value;
      }
    ),
  });

  return (
    <Box m="auto" minW="300px" maxW="400px">
      <AuthForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        initialValues={initialValues}
        validationSchema={validationSchema}
        type="Update"
      />
    </Box>
  );
};

export default SignupForm;
