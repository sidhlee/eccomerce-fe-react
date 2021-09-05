import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ProfileUpdateForm from './ProfileUpdateForm';

type ProfilePageProps = {};

const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <Box m="auto">
      <Heading as="h1" my={[4, 5, '3rem', '3rem']}>
        Your Account
      </Heading>
      <SimpleGrid columns={[1, 2, 2, 2]}>
        <Box minW="300px" maxW="400px">
          <Heading size="lg">Profile</Heading>
          <ProfileUpdateForm />
        </Box>
        <Box>
          <Heading size="lg">Orders</Heading>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProfilePage;
