import { useState } from 'react';
import FormikField from '../../common/components/FormikField';

import { Button, InputRightElement } from '@chakra-ui/react';

type PasswordFieldProps = {
  placeholder: string;
  name: 'password' | 'confirmPassword';
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  placeholder = 'password',
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPassword ? 'text' : 'password';

  return (
    <FormikField name={name} type={inputType} placeholder={placeholder}>
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
    </FormikField>
  );
};

export default PasswordField;
