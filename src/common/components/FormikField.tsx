import { Field, FieldInputProps, FormikProps } from 'formik';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

type FormikFieldProps = {
  type: 'text' | 'email' | 'password';
  name: string;
  showPassword?: boolean;
  togglePassword?: () => void;
};

const FormikField: React.FC<FormikFieldProps> = ({
  showPassword,
  togglePassword,
  type = 'email',
  name,
}) => {
  return (
    <Field name="password">
      {({
        field,
        form,
      }: {
        field: FieldInputProps<string>;
        form: FormikProps<{ [name: string]: string }>;
      }) => (
        <FormControl
          isInvalid={!!form.errors.password && form.touched.password}
          mt="3"
        >
          <FormLabel htmlFor={name}>
            {
              // capitalize
              name
                .split(' ')
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(' ')
            }
          </FormLabel>
          <InputGroup>
            <Input
              {...field}
              id={name}
              placeholder={name}
              type={showPassword ? 'text' : 'password'}
            />
            {type === 'password' ? (
              <InputRightElement w="4.5rem">
                <Button
                  type="button"
                  onClick={togglePassword}
                  size="sm"
                  h="1.75rem"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            ) : null}
          </InputGroup>
          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikField;
