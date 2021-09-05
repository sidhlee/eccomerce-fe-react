import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import FormikField from '../../common/components/FormikField';
import PasswordField from './PasswordField';

type AuthFormProps = {
  type: 'Sign In' | 'Sign Up' | 'Update';
  handleSubmit: (values: any) => void;
  isLoading: boolean;
  initialValues: any;
  validationSchema: any;
};

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  handleSubmit,
  isLoading,
  initialValues,
  validationSchema,
}) => {
  const showMoreFields = type === 'Sign Up' || type === 'Update';
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {showMoreFields && (
            <FormikField type="text" name="username" placeholder="Username" />
          )}
          <FormikField type="email" name="email" placeholder="Email" />
          <PasswordField name="password" placeholder="Password" />
          {showMoreFields && (
            <PasswordField
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          )}
          <Button my={4} type="submit" isLoading={isLoading} isFullWidth>
            {type}
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default AuthForm;
