import { Alert, AlertIcon } from '@chakra-ui/react';

type MessageProps = {
  status: 'error' | 'success' | 'warning' | 'info';
};

const Message: React.FC<MessageProps> = ({ status, children }) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      {children}
    </Alert>
  );
};

export default Message;
