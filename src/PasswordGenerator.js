import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  VStack
} from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy } from "react-icons/fa";

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeAlphabets, setIncludeAlphabets] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('passwordHistory'));
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);

  const generatePassword = () => {
    const numbers = '0123456789';
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let characterPool = '';

    if (includeNumbers) characterPool += numbers;
    if (includeAlphabets) characterPool += alphabets;
    if (includeSpecialChars) characterPool += specialChars;

    if (characterPool === '') return;

    let newPassword = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      newPassword += characterPool[randomIndex];
    }

    setPassword(newPassword);
    const newHistory = [newPassword, ...history.slice(0, 4)];
    setHistory(newHistory);
    localStorage.setItem('passwordHistory', JSON.stringify(newHistory));
  };

  return (
    <Box p={5} maxWidth="500px" mx="auto" textAlign="center">
      <Heading as="h1" size="xl" mb={5}>
        Random Password Generator
      </Heading>
      <VStack spacing={4}>
        <Flex gap={5} alignItems={"center"}>
          <FormControl>
            <Text>{password}</Text>
          </FormControl>
          <CopyToClipboard text={password}>
            <FaRegCopy cursor={"pointer"} />
            {/* <Button colorScheme="teal">Copy to Clipboard</Button> */}
          </CopyToClipboard>
        </Flex>
        <Stack spacing={3} direction="column" align="start">
          <FormControl display="flex" alignItems="center">
            <Checkbox
              isChecked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            >
              Include Numbers
            </Checkbox>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <Checkbox
              isChecked={includeAlphabets}
              onChange={(e) => setIncludeAlphabets(e.target.checked)}
            >
              Include Alphabets
            </Checkbox>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <Checkbox
              isChecked={includeSpecialChars}
              onChange={(e) => setIncludeSpecialChars(e.target.checked)}
            >
              Include Special Characters
            </Checkbox>
          </FormControl>
        </Stack>
        <Button colorScheme="teal" onClick={generatePassword}>
          Generate Password
        </Button>
      </VStack>
      <VStack alignItems={"center"} justify={"center"} mt={6} w={"100%"} >
        <Heading as="h2" size="md" mb={2} >
          Last 5 Passwords:
        </Heading>
        <VStack spacing={2} w={"100%"} alignItems={"center"} justify={"center"} >
          {history.map((item, index) => (
            <Flex alignItems={"center"} gap={5} w={"50%"}  ml={10}>
              <Text key={index} w={"50%"}>{item}</Text>
              <CopyToClipboard text={item} w={"50%"}>
                <FaRegCopy cursor={"pointer"} />
                {/* <Button colorScheme="teal">Copy to Clipboard</Button> */}
              </CopyToClipboard>
            </Flex>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default PasswordGenerator;
