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
        <ProfileUpdateForm />
      </SimpleGrid>
    </Box>
  );
};

export default ProfilePage;
