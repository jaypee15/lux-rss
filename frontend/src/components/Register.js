import { useEffect, useState } from 'react';
import { register } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

    // return (
    //     <section>
    //         <form onSubmit={handleSubmit}>
    //             <h1>Register</h1>
    //             <hr />
    //             <div>
    //                 <label htmlFor="username">Username</label>
    //                 <input
    //                     type="text"
    //                     id="username"
    //                     onChange={(e) => setUsername(e.target.value)}
    //                     placeholder="Username"
    //                     required
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor="password">Password</label>
    //                 <input
    //                     type="password"
    //                     id="password"
    //                     onChange={(e) => setPassword(e.target.value)}
    //                     placeholder="Password"
    //                     required
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor="confirm-password">Confirm Password</label>
    //                 <input
    //                     type="password"
    //                     id="confirm-password"
    //                     onChange={(e) => setPassword2(e.target.value)}
    //                     placeholder="Confirm Password"
    //                     required
    //                 />
    //                 <p>
    //                     {password2 !== password ? 'Passwords do not match' : ''}
    //                 </p>
    //             </div>
    //             <button type="submit">Register</button>
    //         </form>
    //     </section>
    // );





  
  export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
   
    }, []);

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setPassword2('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await register(username, password, password2);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/');
            resetForm();
        }
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              
              <FormControl id="name" isRequired>
                <FormLabel>User name</FormLabel>
                <Input type="name" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={handleSubmit}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already have an account? <Link href="/login" color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }