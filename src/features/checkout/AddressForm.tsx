import { ChangeEvent, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Link,
  Select,
  Text,
  FormLabel,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { useAppDispatch } from '../../app/hooks';
import { useToast } from '@chakra-ui/react';

import FormikField from '../../common/components/FormikField';

import * as Yup from 'yup';
import YupPassword from 'yup-password';
import {
  CountryCode,
  useGetCountryCodesQuery,
} from '../../services/countryCodeService';
YupPassword(Yup); // extend yup

type AddressFormProps = {};

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

const AddressForm: React.FC<AddressFormProps> = () => {
  const { data: countryCodes } = useGetCountryCodesQuery();
  const [currentCountry, setCurrentCountry] = useState<CountryCode>();

  const toast = useToast();

  const handleSubmit = async (values: SignupValues) => {
    try {
      const { username, email, password } = values;
      const body = {
        username,
        email,
        password,
      };
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

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryCode = e.target.value;
    const country = countryCodes?.find(
      (countryCode) => countryCode.code === selectedCountryCode
    );
    setCurrentCountry(country);
  };

  const handleStateChange = () => {};

  const isProvince = currentCountry?.code === 'CA';

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikField type="text" name="firstname" placeholder="First name" />
          <FormikField type="text" name="lastname" placeholder="Last name" />
          <FormControl id="country" mt="4">
            <FormLabel>Country</FormLabel>
            <Select placeholder="Select country" onChange={handleCountryChange}>
              {countryCodes?.map((countryCode) => (
                <option key={countryCode.code} value={countryCode.code}>
                  {countryCode.name}
                </option>
              ))}
            </Select>
          </FormControl>
          {currentCountry?.states ? (
            <FormControl id="state" mt="4">
              <FormLabel>{isProvince ? 'Province' : 'State'}</FormLabel>
              <Select
                placeholder={`Select ${isProvince ? 'Province' : 'State'}`}
                onChange={handleStateChange}
              >
                {currentCountry?.states.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          ) : null}
          <FormikField type="text" name="address" placeholder="Address" />
          <FormikField type="text" name="city" placeholder="City" />
          <FormikField type="text" name="zip" placeholder="Zip / Postal Code" />
          <FormikField type="text" name="phone" placeholder="Phone number" />
          <Button
            type="submit"
            my="4"
            isFullWidth
            isDisabled={false}
            bg="blackAlpha.800"
            _hover={{ bg: 'blackAlpha.900' }}
            color="white"
            onClick={() => {
              console.log('continue');
            }}
          >
            Continue
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default AddressForm;
