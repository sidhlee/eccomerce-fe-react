import { Field, FieldInputProps, FormikProps } from 'formik';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from '@chakra-ui/react';

type FormikFieldProps = {
  type?: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
};

const FormikField: React.FC<FormikFieldProps> = ({
  type = 'text',
  name,
  placeholder,
  children,
}) => {
  return (
    <Field name={name}>
      {({
        field,
        form,
      }: {
        field: FieldInputProps<string>;
        form: FormikProps<{ [name: string]: string }>;
      }) => {
        return (
          <FormControl
            isInvalid={!!form.errors[name] && form.touched[name]}
            mt="3"
          >
            <FormLabel htmlFor={name}>{placeholder}</FormLabel>
            <InputGroup>
              <Input
                {...field}
                id={name}
                placeholder={placeholder}
                type={type}
              />
              {children}
            </InputGroup>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default FormikField;
