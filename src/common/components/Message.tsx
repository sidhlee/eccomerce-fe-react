import { Alert, AlertIcon } from '@chakra-ui/react';

type MessageProps = {
  status: 'error' | 'success' | 'warning' | 'info';
};

const Message: React.FC<MessageProps> = ({ status, children }) => {
  return (
    <Alert status={status} gridColumn="1 / -1" my="5">
      <AlertIcon />
      {children}
    </Alert>
  );
};

export default Message;
