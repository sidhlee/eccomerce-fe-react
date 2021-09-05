import { useSignupMutation } from '../../services/authService';
import { setCredentials } from '../auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useToast, Box } from '@chakra-ui/react';
import AuthForm from '../auth/AuthForm';

import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useEffect } from 'react';
import {
  useProfileUpdateMutation,
  useUserProfileQuery,
} from '../../services/profileService';
import { useHistory } from 'react-router-dom';
YupPassword(Yup); // extend yup

type SignupFormProps = {};

interface SignupValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC<SignupFormProps> = () => {
  const user = useAppSelector((state) => state.auth.user);

  // Redirect user to login page when the user is logged out.
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  const initialValues: SignupValues = {
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  };

  const [updateProfile, { isLoading }] = useProfileUpdateMutation();
  const dispatch = useAppDispatch();
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
      const user = await updateProfile(body).unwrap();
      // dispatch action with user payload
      dispatch(setCredentials(user));
      toast({
        status: 'success',
        title: 'Profile',
        description: 'Updated successfully.',
        isClosable: true,
      });
    } catch (err) {
      const errorMessage = err.data?.detail
        ? err.data.detail
        : 'Could not update profile.';
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
    // password is only updated when there's a value, so not required.
    password: Yup.string().password().minUppercase(0).minSymbols(0),
    confirmPassword: Yup.string().test(
      'passwords-match',
      'Passwords must match',
      function (value) {
        return this.parent.password === value;
      }
    ),
  });

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      initialValues={initialValues}
      validationSchema={validationSchema}
      type="Update"
    />
  );
};

export default SignupForm;
