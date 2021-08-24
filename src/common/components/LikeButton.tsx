import { Box, Flex, IconButton } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';

type LikeButtonProps = {
  likes: number;
};

const LikeButton: React.FC<LikeButtonProps> = ({ likes }) => {
  return (
    <Flex alignItems="center">
      <IconButton icon={<FiHeart />} aria-label="like" size="sm" mr="1" />
      <Box as="span">{likes}</Box>
    </Flex>
  );
};

export default LikeButton;
