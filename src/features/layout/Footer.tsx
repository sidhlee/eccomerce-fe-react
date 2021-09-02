import { Box, Container, Text } from '@chakra-ui/react';

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <Box as="footer" py="3">
      <Container>
        <Text textAlign="center">
          Copyright &copy; {new Date().getFullYear()} Sid Lee
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
