import React from 'react';
import PasswordGenerator from './PasswordGenerator';
import { Box, Container } from '@chakra-ui/react';

const App = () => (
  <Box bg="gray.100" minH="100vh" py={10}>
    <Container>
      <PasswordGenerator />
    </Container>
  </Box>
);

export default App;
