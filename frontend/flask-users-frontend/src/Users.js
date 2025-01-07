import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Input, Button, HStack, List, ListItem, IconButton, Text, Container } from '@chakra-ui/react';
import { Toaster, toaster } from "./components/ui/toaster"
import axios from 'axios';

const apiUrl = 'https://zz2vxt1eck.execute-api.us-east-2.amazonaws.com/dev/users';

function Users() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Fetch all users
    const getUsers = async () => {
        try {
            const response = await axios.get(apiUrl);
            setUsers(response.data);
        } catch (error) {
            toaster.create({
                title: 'Error fetching users',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    // Add a new user
    const addUser = async () => {
        if (!userId || !userName || !userEmail) {
            toaster.create({
                title: 'Missing Fields',
                description: 'Please fill out all fields',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        try {
            await axios.post(apiUrl, {
                id: parseInt(userId),
                name: userName,
                email: userEmail
            });
            toaster.create({
                title: 'User Added',
                description: 'User added successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            getUsers();
            setUserId('');
            setUserName('');
            setUserEmail('');
        } catch (error) {
            toaster.create({
                title: 'Error Adding User',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    // Delete a user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            toaster.create({
                title: 'User Deleted',
                description: 'User deleted successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            getUsers();
        } catch (error) {
            toaster.create({
                title: 'Error Deleting User',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Container maxW="container.md" py={10}>
            <Toaster/>

            <Heading textAlign="center" mb={8}>User Management</Heading>

            {/* Form Section */}
            <VStack spacing={4} mb={8} align="stretch">
                <Input 
                    placeholder="User ID"
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <Input 
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Input 
                    placeholder="User Email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button colorScheme="blue" onClick={addUser} width="full">
                    Add User
                </Button>
            </VStack>

            {/* Users List Section */}
            <Heading size="md" mb={4}>Users List</Heading>
            <List spacing={4}>
                {users.map((user) => (
                    <ListItem key={user.id} border="1px" borderColor="gray.200" borderRadius="md" p={4}>
                        <HStack justify="space-between">
                            <Box>
                                <Text fontWeight="bold">{user.name}</Text>
                                <Text fontSize="sm" color="gray.600">{user.email}</Text>
                            </Box>
                            <IconButton aria-label="Search database"
                                colorScheme="red"
                                onClick={() => deleteUser(user.id)}
                            />
                        </HStack>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Users;
